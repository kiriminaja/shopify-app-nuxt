import type { H3Event } from 'h3'
import {
  getHeader,
  getQuery,
  setResponseHeader,
  readRawBody,
} from 'h3'
import type { JwtPayload } from '@shopify/shopify-api'
import { getShopifyApi, getResolvedConfig } from '../services/shopify'

/**
 * Get the session token from the Authorization header.
 */
export function getSessionTokenHeader(event: H3Event): string | undefined {
  const authHeader = getHeader(event, 'authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return undefined
}

/**
 * Get the session token from the URL search params.
 */
export function getSessionTokenFromUrlParam(
  event: H3Event
): string | undefined {
  const query = getQuery(event)
  return query.id_token as string | undefined
}

/**
 * Get the shop domain from the request (query params, headers, or body).
 */
export function getShopFromEvent(event: H3Event): string | undefined {
  const query = getQuery(event)
  if (query.shop) return query.shop as string

  const shopHeader = event.req.headers.get('x-shopify-shop-domain')
  if (shopHeader) return shopHeader

  return undefined
}

/**
 * Validate a session token and return the decoded payload.
 */
export async function validateSessionToken(
  sessionToken: string
): Promise<JwtPayload> {
  const api = getShopifyApi()
  const payload = await api.session.decodeSessionToken(sessionToken)
  return payload
}

/**
 * Set CORS headers on the response.
 */
export function ensureCORSHeaders(event: H3Event): void {
  const config = getResolvedConfig()
  event.res.headers.set('Access-Control-Allow-Origin', config.appUrl)
  event.res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  event.res.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  )
  event.res.headers.set('Access-Control-Allow-Credentials', 'true')
}

/**
 * Check if the request is from a bot (user-agent based).
 */
export function isBotRequest(event: H3Event): boolean {
  const ua = event.req.headers.get('user-agent') || ''
  // Simple bot detection — matches the React Router package behavior
  try {
    return isbot(ua)
  } catch {
    return false
  }
}

export function toWebRequest(event: H3Event): Request {
  const url = getRequestURL(event).toString()
  const method = event.req.method || 'GET'
  const headers = new Headers(event.req.headers)

  const body =
    method !== 'GET' && method !== 'HEAD' ? event.req.arrayBuffer() : undefined

  return new Request(url, {
    method,
    headers,
    body
  })
}

/**
 * Convert H3Event to Web Request for Shopify API compatibility.
 */
export function eventToRequest(event: H3Event): Request {
  return toWebRequest(event)
}

/**
 * Verify a webhook request's HMAC signature.
 */
export async function verifyWebhookHmac(event: H3Event): Promise<boolean> {
  const api = getShopifyApi()
  const hmac = event.req.headers.get('x-shopify-hmac-sha256')
  const topic = event.req.headers.get('x-shopify-topic')
  const shop = event.req.headers.get('x-shopify-shop-domain')

  if (!hmac || !topic || !shop) {
    return false
  }

  const rawBody = await event.req.text()
  if (!rawBody) return false

  try {
    const { createHmac } = await import('node:crypto')
    const generatedHmac = createHmac('sha256', api.config.apiSecretKey)
      .update(rawBody, 'utf8')
      .digest('base64')
    return safeCompare(generatedHmac, hmac)
  } catch {
    return false
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

/**
 * Render an HTML page that loads App Bridge to handle auth redirects.
 */
export function renderAppBridgePage(
  apiKey: string,
  _appUrl: string,
  redirectUrl?: string
): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="shopify-api-key" content="${apiKey}" />
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
  </head>
  <body>
    <script>
      var defined = typeof window !== 'undefined' && window.shopify;
      if (defined) {
        ${redirectUrl ? `window.open('${redirectUrl}', '_top');` : ''}
      }
    </script>
  </body>
</html>`
}
