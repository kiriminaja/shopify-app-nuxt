import type { H3Event } from 'h3'
import { getQuery, createError } from 'h3'
import {
  getShopifyApi,
  getResolvedConfig,
  getSessionStorage
} from '../services/shopify'
import { createAdminApiContext } from './clients'
import {
  getSessionTokenHeader,
  getSessionTokenFromUrlParam,
  validateSessionToken,
  ensureCORSHeaders,
  isBotRequest,
  getShopFromEvent,
  renderAppBridgePage
} from './helpers'
import type { AdminContext, BillingContext } from '../../types'
import { AppDistribution } from '../../types'

const OnlineAccessToken =
  'urn:shopify:params:oauth:token-type:online-access-token'
const OfflineAccessToken =
  'urn:shopify:params:oauth:token-type:offline-access-token'

/**
 * Authenticate an admin request and return an authenticated admin context.
 *
 * Use this in your server API routes to interact with the Shopify Admin API:
 *
 * ```ts
 * // server/api/products.ts
 * export default defineEventHandler(async (event) => {
 *   const { admin, session } = await useShopifyAdmin(event)
 *   const response = await admin.graphql(`{ shop { name } }`)
 *   return response
 * })
 * ```
 */
export async function useShopifyAdmin(event: H3Event): Promise<AdminContext> {
  const api = getShopifyApi()
  const config = getResolvedConfig()
  const sessionStorage = getSessionStorage()

  // Handle bot requests
  if (isBotRequest(event)) {
    throw createError({
      statusCode: 410,
      statusMessage: 'Gone'
    })
  }

  // Handle OPTIONS requests (CORS preflight)
  if (event.method === 'OPTIONS') {
    ensureCORSHeaders(event)
    throw createError({
      statusCode: 204,
      statusMessage: 'No Content'
    })
  }

  // Get session token from header or URL param
  const headerToken = getSessionTokenHeader(event)
  const paramToken = getSessionTokenFromUrlParam(event)
  const sessionToken = headerToken || paramToken

  if (!sessionToken) {
    // No session token — for document requests, redirect to auth
    const shop = getShopFromEvent(event)
    if (!shop) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing shop parameter'
      })
    }

    // Redirect to OAuth
    const query = getQuery(event)
    const host = query.host as string
    if (!host) {
      // Return App Bridge page for embedded apps
      throw createError({
        statusCode: 302,
        statusMessage: 'Redirect',
        data: {
          redirect: `${config.auth.path}?shop=${shop}`
        }
      })
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - No session token'
    })
  }

  // Validate the session token
  let payload: any
  let shop: string
  let sessionId: string

  if (config.distribution !== AppDistribution.ShopifyAdmin) {
    payload = await validateSessionToken(sessionToken)
    const dest = new URL(payload.dest)
    shop = dest.hostname

    sessionId = config.useOnlineTokens
      ? api.session.getJwtSessionId(shop, payload.sub)
      : api.session.getOfflineId(shop)
  } else {
    // ShopifyAdmin apps - get shop from request
    shop = getShopFromEvent(event) || ''
    sessionId =
      (await api.session.getCurrentId({
        isOnline: config.useOnlineTokens,
        rawRequest: event.req,
        rawResponse: event.res
      })) || ''
  }

  // Load existing session from storage
  const existingSession = sessionId
    ? await sessionStorage.loadSession(sessionId)
    : undefined

  let session: any

  if (existingSession && existingSession.isActive(api.config.scopes)) {
    // Session exists and is active
    session = existingSession
  } else {
    // Need to perform token exchange
    if (config.distribution === AppDistribution.ShopifyAdmin) {
      if (!existingSession) {
        throw createError({
          statusCode: 401,
          statusMessage: 'No session found for this shop'
        })
      }
      session = existingSession
    } else {
      // Token exchange for embedded apps
      session = await performTokenExchange(
        api,
        config,
        sessionStorage,
        shop,
        sessionToken
      )
    }
  }

  // Create the admin API context
  const admin = createAdminApiContext(api, session)

  // Create billing context
  const billing = createBillingContext(api, config, session, event)

  // Create CORS helper
  const cors = (response: Response): Response => {
    response.headers.set('Access-Control-Allow-Origin', config.appUrl)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    return response
  }

  // Create redirect helper
  const redirect = (url: string, init?: { target?: string }): Response => {
    const target = init?.target || '_self'
    if (url.startsWith('shopify://') || target !== '_self') {
      return new Response(
        renderAppBridgePage(config.apiKey, config.appUrl, url),
        {
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        }
      )
    }
    return new Response(null, {
      status: 302,
      headers: { Location: url }
    })
  }

  return {
    session,
    admin,
    sessionToken: payload,
    billing,
    cors,
    redirect
  }
}

async function performTokenExchange(
  api: any,
  config: any,
  sessionStorage: any,
  shop: string,
  sessionToken: string
) {
  let onlineSession: any
  try {
    const result = await api.auth.tokenExchange({
      shop,
      sessionToken,
      requestedTokenType: config.useOnlineTokens
        ? OnlineAccessToken
        : OfflineAccessToken
    })
    onlineSession = result.session
  } catch (error: any) {
    console.debug('[shopify-nuxt] Token exchange failed:', {
      shop,
      requestedTokenType: config.useOnlineTokens
        ? OnlineAccessToken
        : OfflineAccessToken,
      scopes: api.config.scopes?.toString(),
      responseBody: error?.response?.body,
      message: error?.message
    })
    throw error
  }

  // Store the session
  await sessionStorage.storeSession(onlineSession)

  // If using online tokens, also get and store an offline token
  if (config.useOnlineTokens) {
    const { session: offlineSession } = await api.auth.tokenExchange({
      shop,
      sessionToken,
      requestedTokenType: OfflineAccessToken
    })
    await sessionStorage.storeSession(offlineSession)
  }

  // Run afterAuth hook
  if (config.hooks?.afterAuth) {
    const admin = createAdminApiContext(api, onlineSession)
    await config.hooks.afterAuth({ session: onlineSession, admin })
  }

  return onlineSession
}

function createBillingContext(
  api: any,
  config: any,
  session: any,
  _event: H3Event
): BillingContext {
  return {
    require: async (options: { plans: string | string[] }) => {
      if (!config.billing) {
        throw new Error(
          'Billing is not configured. Add billing config to configureShopify().'
        )
      }
      const plans = Array.isArray(options.plans)
        ? options.plans
        : [options.plans]
      const hasPayment = await api.billing.check({ session, plans })
      if (!hasPayment) {
        const confirmationUrl = await api.billing.request({
          session,
          plan: plans[0],
          isTest: true
        })
        throw new Response(null, {
          status: 302,
          headers: { Location: confirmationUrl }
        })
      }
    },
    check: async (options?: { plans?: string | string[] }) => {
      if (!config.billing) return { hasActivePayment: false }
      const plans = options?.plans
        ? Array.isArray(options.plans)
          ? options.plans
          : [options.plans]
        : Object.keys(config.billing)
      return api.billing.check({ session, plans })
    },
    request: async (options: {
      plan: string
      isTest?: boolean
      returnUrl?: string
    }) => {
      if (!config.billing) {
        throw new Error('Billing is not configured.')
      }
      const confirmationUrl = await api.billing.request({
        session,
        plan: options.plan,
        isTest: options.isTest ?? true,
        returnUrl: options.returnUrl
      })
      return new Response(null, {
        status: 302,
        headers: { Location: confirmationUrl }
      })
    }
  }
}
