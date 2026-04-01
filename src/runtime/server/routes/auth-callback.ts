import { defineEventHandler, getQuery, sendRedirect, createError } from 'h3'
import {
  getShopifyApi,
  getResolvedConfig,
  getSessionStorage
} from '../services/shopify'
import { createAdminApiContext } from '../utils/clients'

/**
 * Handle the OAuth callback from Shopify.
 * Validates the callback, stores the session, and redirects to the app.
 */
export default defineEventHandler(async (event) => {
  const api = getShopifyApi()
  const config = getResolvedConfig()
  const sessionStorage = getSessionStorage()
  const query = getQuery(event)

  try {
    const callbackResponse = await api.auth.callback({
      rawRequest: event.node.req,
      rawResponse: event.node.res
    })

    const { session } = callbackResponse

    // Store the session
    await sessionStorage.storeSession(session)

    // If using online tokens, also get and store an offline session
    if (config.useOnlineTokens && session.isOnline) {
      // We already have the online session, that's fine
    }

    // Run afterAuth hook
    if (config.hooks?.afterAuth) {
      const admin = createAdminApiContext(api, session)
      await config.hooks.afterAuth({ session, admin })
    }

    // Register webhooks if configured
    if (config.webhooks) {
      try {
        await api.webhooks.register({ session })
      } catch (e) {
        console.debug('[shopify-app-nuxt] Failed to register webhooks:', e)
      }
    }

    // Build the redirect URL
    const shop = session.shop
    const host =
      (query.host as string) || Buffer.from(`${shop}/admin`).toString('base64')

    // Redirect to the app's root within the Shopify admin
    const redirectUrl = `${config.appUrl}?shop=${shop}&host=${host}`
    return sendRedirect(event, redirectUrl, 302)
  } catch (error: any) {
    // BotActivityDetected is expected when non-browser clients hit the callback
    if (error.constructor?.name === 'BotActivityDetected') {
      throw createError({
        statusCode: 410,
        statusMessage: 'Gone'
      })
    }
    console.debug('[shopify-app-nuxt] Auth callback error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Authentication failed',
      data: { error: error.message }
    })
  }
})
