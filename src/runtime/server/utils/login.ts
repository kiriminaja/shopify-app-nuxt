import type { H3Event } from 'h3'
import { readBody, getQuery, HTTPError } from 'h3'
import { getResolvedConfig } from '../services/shopify'
import { AppDistribution, type LoginError, LoginErrorType } from '../../types'

/**
 * Handle merchant login for non-embedded apps (AppStore and SingleMerchant distribution).
 *
 * Validates the shop domain and returns any errors, or redirects to auth flow.
 *
 * ```ts
 * // server/api/auth/login.post.ts
 * export default defineEventHandler(async (event) => {
 *   const errors = await useShopifyLogin(event)
 *   if (errors) return errors
 *   // redirect happened — this won't be reached
 * })
 * ```
 */
export async function useShopifyLogin(
  event: H3Event
): Promise<LoginError | never> {
  const config = getResolvedConfig()

  if (config.distribution === AppDistribution.ShopifyAdmin) {
    throw new HTTPError({
      statusCode: 400,
      statusMessage: 'Login is not available for ShopifyAdmin apps'
    })
  }

  let shop: string | undefined

  if (event.req.method === 'POST') {
    const body = await readBody<{ shop?: string }>(event)
    shop = body?.shop
  } else {
    const query = getQuery(event)
    shop = query.shop as string | undefined
  }

  if (!shop) {
    return { shop: LoginErrorType.MissingShop }
  }

  // Sanitize shop domain
  const sanitized = sanitizeShop(shop)
  if (!sanitized) {
    return { shop: LoginErrorType.InvalidShop }
  }

  // Redirect to auth
  throw new Response(null, {
    status: 302,
    headers: {
      Location: `${config.auth.path}?shop=${sanitized}`
    }
  })
}

function sanitizeShop(shop: string): string | null {
  // Remove protocol if present
  shop = shop.replace(/^https?:\/\//, '')
  // Remove trailing slashes and paths
  shop = shop.split('/')[0] || ''
  // Validate it looks like a myshopify.com domain
  if (/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(shop)) {
    return shop
  }
  // Try appending .myshopify.com
  if (/^[a-z0-9][a-z0-9-]*$/i.test(shop)) {
    return `${shop}.myshopify.com`
  }
  return null
}
