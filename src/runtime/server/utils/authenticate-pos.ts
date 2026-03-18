import type { H3Event } from 'h3'
import { createError } from 'h3'
import {
  getSessionTokenHeader,
  getSessionTokenFromUrlParam,
  validateSessionToken
} from './helpers'
import type { JwtPayload } from '@shopify/shopify-api'

export interface POSContext {
  sessionToken: JwtPayload
  cors: (response: Response) => Response
}

/**
 * Authenticate a request from a POS UI extension.
 *
 * ```ts
 * // server/api/pos/widgets.ts
 * export default defineEventHandler(async (event) => {
 *   const { sessionToken, cors } = await useShopifyPos(event)
 *   return cors(new Response(JSON.stringify({ shop: sessionToken.dest })))
 * })
 * ```
 */
export async function useShopifyPos(event: H3Event): Promise<POSContext> {
  const headerToken = getSessionTokenHeader(event)
  const paramToken = getSessionTokenFromUrlParam(event)
  const sessionToken = headerToken || paramToken

  if (!sessionToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing session token'
    })
  }

  const payload = await validateSessionToken(sessionToken)

  const cors = (response: Response): Response => {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    return response
  }

  return {
    sessionToken: payload,
    cors
  }
}
