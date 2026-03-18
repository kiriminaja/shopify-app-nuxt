import type { H3Event } from 'h3'
import { getHeader, readRawBody, createError } from 'h3'
import { getShopifyApi, getSessionStorage } from '../services/shopify'
import { createAdminApiContext } from './clients'

/**
 * Authenticate a request from a fulfillment service.
 *
 * ```ts
 * // server/api/fulfillment-service.ts
 * export default defineEventHandler(async (event) => {
 *   const { admin, session } = await useShopifyFulfillmentService(event)
 *   return { success: true }
 * })
 * ```
 */
export async function useShopifyFulfillmentService(event: H3Event) {
  const api = getShopifyApi()

  const shop = getHeader(event, 'x-shopify-shop-domain')
  const hmac = getHeader(event, 'x-shopify-hmac-sha256')

  if (!shop || !hmac) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required headers'
    })
  }

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
    admin
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
