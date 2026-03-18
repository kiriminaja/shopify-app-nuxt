import type { H3Event } from 'h3'
import { getHeader, readRawBody, createError } from 'h3'
import { getShopifyApi, getSessionStorage } from '../services/shopify'
import { createAdminApiContext } from './clients'
import type { FlowContext } from '../../types'

/**
 * Authenticate a Shopify Flow extension request.
 *
 * Validates the HMAC signature and returns the flow context:
 *
 * ```ts
 * // server/api/flow.ts
 * export default defineEventHandler(async (event) => {
 *   const { admin, session, payload } = await useShopifyFlow(event)
 *   // Perform flow extension logic
 *   return { success: true }
 * })
 * ```
 */
export async function useShopifyFlow(event: H3Event): Promise<FlowContext> {
  const api = getShopifyApi()

  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed - Flow requests must be POST'
    })
  }

  const shop = getHeader(event, 'x-shopify-shop-domain')
  const hmac = getHeader(event, 'x-shopify-hmac-sha256')

  if (!shop || !hmac) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required headers'
    })
  }

  // Read raw body for HMAC verification
  const rawBody = await readRawBody(event)
  if (!rawBody) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing request body'
    })
  }

  // Verify HMAC
  const { createHmac: hmacCreate } = await import('node:crypto')
  const generatedHmac = hmacCreate('sha256', api.config.apiSecretKey)
    .update(rawBody, 'utf8')
    .digest('base64')

  if (!safeCompare(generatedHmac, hmac)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'HMAC validation failed'
    })
  }

  // Parse payload
  let payload: Record<string, any>
  try {
    payload = JSON.parse(rawBody)
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid JSON body'
    })
  }

  // Load session
  const sessionStorage = getSessionStorage()
  const offlineId = api.session.getOfflineId(shop)
  const session = await sessionStorage.loadSession(offlineId)

  if (!session) {
    throw createError({
      statusCode: 400,
      statusMessage: `No session found for shop ${shop}`
    })
  }

  const admin = createAdminApiContext(api, session)

  return {
    session,
    admin,
    payload
  }
}

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  const encoder = new TextEncoder()
  const bufA = encoder.encode(a)
  const bufB = encoder.encode(b)
  let result = 0
  for (let i = 0; i < bufA.length; i++) {
    result |= bufA[i]! ^ bufB[i]!
  }
  return result === 0
}
