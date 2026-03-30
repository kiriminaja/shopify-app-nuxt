import type { H3Event } from 'h3'
import {
  getHeader,
  getQuery,
  setResponseHeader,
  readRawBody,
} from 'h3'
import type { JwtPayload } from '@shopify/shopify-api'
import { isbot } from 'isbot'
import { getShopifyApi, getResolvedConfig } from '../services/shopify'

export function getSessionTokenHeader(event: H3Event): string | undefined {
  const authHeader = getHeader(event, 'authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return undefined
}

export function getSessionTokenFromUrlParam(
  event: H3Event
): string | undefined {
  const query = getQuery(event)
  return query.id_token as string | undefined
}

export function getShopFromEvent(event: H3Event): string | undefined {
  const query = getQuery(event)
  if (query.shop) return query.shop as string

  const shopHeader = getHeader(event, 'x-shopify-shop-domain')
  if (shopHeader) return shopHeader

  return undefined
}

export async function validateSessionToken(
  sessionToken: string
): Promise<JwtPayload> {
  const api = getShopifyApi()
  const payload = await api.session.decodeSessionToken(sessionToken)
  return payload
}

export function ensureCORSHeaders(event: H3Event): void {
  const config = getResolvedConfig()
  setResponseHeader(event, 'Access-Control-Allow-Origin', config.appUrl)
  setResponseHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  setResponseHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setResponseHeader(event, 'Access-Control-Allow-Credentials', 'true')
}

export function isBotRequest(event: H3Event): boolean {
  const ua = getHeader(event, 'user-agent') || ''
  try {
    return isbot(ua)
  } catch {
    return false
  }
}

export async function verifyWebhookHmac(event: H3Event): Promise<boolean> {
  const api = getShopifyApi()
  const hmac = getHeader(event, 'x-shopify-hmac-sha256')
  const topic = getHeader(event, 'x-shopify-topic')
  const shop = getHeader(event, 'x-shopify-shop-domain')
  if (!hmac || !topic || !shop) {
    return false
  }
  const rawBody = await readRawBody(event)
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

export function renderAppBridgePage(
  apiKey: string,
  _appUrl: string,
  redirectUrl?: string,
): string {
  const parts: string[] = [
    '<!DOCTYPE html>',
    '<html>',
    '  <head>',
    '    <meta charset="utf-8" />',
    '    <meta name="shopify-api-key" content="' + apiKey + '" />',
    '    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>',
    '  </head>',
    '  <body>',
    '    <script>',
  ]
  if (redirectUrl) {
    parts.push("      window.open('" + redirectUrl + "', '_top');")
  }
  parts.push('    </script>')
  parts.push('  </body>')
  parts.push('</html>')
  return parts.join('\n')
}
