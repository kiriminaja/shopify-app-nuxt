import type { Session } from '@shopify/shopify-api'
import { getShopifyApi } from '../services/shopify'

/**
 * Register shop-specific webhooks using the Admin GraphQL API.
 *
 * In most cases, app-specific webhooks defined in `shopify.app.toml` are sufficient.
 * Use this only when you need shop-specific webhooks.
 *
 * ```ts
 * // In your afterAuth hook:
 * configureShopify({
 *   hooks: {
 *     afterAuth: async ({ session }) => {
 *       await registerShopifyWebhooks(session)
 *     }
 *   }
 * })
 * ```
 */
export async function registerShopifyWebhooks(session: Session) {
  const api = getShopifyApi()
  return api.webhooks.register({ session })
}
