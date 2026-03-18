import type { H3Event } from 'h3'
import { createError } from 'h3'
import {
  getSessionTokenHeader,
  getSessionTokenFromUrlParam,
  validateSessionToken
} from './helpers'
import type { PublicContext } from '../../types'

/**
 * Authenticate a public request (e.g., from checkout extensions, app proxy).
 *
 * Returns the decoded session token for verification, but does NOT load a full session.
 *
 * ```ts
 * // server/api/public/widgets.ts
 * export default defineEventHandler(async (event) => {
 *   const { sessionToken, cors } = await useShopifyPublic(event)
 *   const data = await getWidgets(sessionToken)
 *   return cors(new Response(JSON.stringify(data)))
 * })
 * ```
 */
export async function useShopifyPublic(event: H3Event): Promise<PublicContext> {
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
