import type { H3Event } from 'h3'
import { getHeader, readRawBody, createError } from 'h3'
import {
  getShopifyApi,
  getResolvedConfig,
  getSessionStorage
} from '../services/shopify'
import type { WebhookContext } from '../../types'

/**
 * Authenticate a Shopify webhook request.
 *
 * Validates the HMAC signature and returns the webhook context:
 *
 * ```ts
 * // server/api/webhooks.ts
 * export default defineEventHandler(async (event) => {
 *   const { topic, shop, session, payload } = await useShopifyWebhook(event)
 *
 *   switch (topic) {
 *     case 'PRODUCTS_CREATE':
 *       // handle product creation
 *       break
 *     case 'APP_UNINSTALLED':
 *       // clean up shop data
 *       break
 *   }
 *
 *   return { success: true }
 * })
 * ```
 */
export async function useShopifyWebhook(
  event: H3Event
): Promise<WebhookContext> {
  const api = getShopifyApi()
  const config = getResolvedConfig()

  // Only POST requests
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed - Webhooks must be POST'
    })
  }

  const topic = getHeader(event, 'x-shopify-topic')
  const shop = getHeader(event, 'x-shopify-shop-domain')
  const hmac = getHeader(event, 'x-shopify-hmac-sha256')
  const apiVersion =
    getHeader(event, 'x-shopify-api-version') || config.apiVersion

  if (!topic || !shop || !hmac) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Missing required webhook headers (x-shopify-topic, x-shopify-shop-domain, x-shopify-hmac-sha256)'
    })
  }

  // Read the raw body for HMAC verification
  const rawBody = await readRawBody(event)
  if (!rawBody) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing request body'
    })
  }

  // Verify HMAC
  const { createHmac } = await import('node:crypto')
  const generatedHmac = createHmac('sha256', api.config.apiSecretKey)
    .update(rawBody, 'utf8')
    .digest('base64')

  // Timing-safe comparison
  if (!safeCompare(generatedHmac, hmac)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Webhook HMAC validation failed'
    })
  }

  // Parse payload
  let payload: Record<string, any>
  try {
    payload = JSON.parse(rawBody)
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid JSON in webhook body'
    })
  }

  // Try to load the session for this shop
  let session
  try {
    const sessionStorage = getSessionStorage()
    const offlineId = api.session.getOfflineId(shop)
    session = (await sessionStorage.loadSession(offlineId)) || undefined
  } catch {
    // Session may not exist (e.g., APP_UNINSTALLED webhook)
    session = undefined
  }

  return {
    topic: topic.toUpperCase().replace(/\//g, '_'),
    shop,
    session,
    payload,
    apiVersion
  }
}

/**
 * Timing-safe string comparison to prevent timing attacks.
 */
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
