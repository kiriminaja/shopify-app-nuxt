import { getShopifyApi, getSessionStorage } from '../services/shopify'
import { createAdminApiContext } from './clients'
import type { AdminApiContext } from './clients'
import type { Session } from '@shopify/shopify-api'

/**
 * Get an unauthenticated Admin API context for a given shop.
 *
 * Uses the stored offline session to access the Admin API without an incoming request.
 * Useful for background jobs, cron tasks, or requests from external systems.
 *
 * ```ts
 * // server/api/cron/sync-products.ts
 * export default defineEventHandler(async (event) => {
 *   const { admin, session } = await useShopifyUnauthenticatedAdmin('my-shop.myshopify.com')
 *   const products = await admin.graphql(`{ products(first: 10) { edges { node { id title } } } }`)
 *   return products
 * })
 * ```
 */
export async function useShopifyUnauthenticatedAdmin(shop: string): Promise<{
  admin: AdminApiContext
  session: Session
}> {
  const api = getShopifyApi()
  const sessionStorage = getSessionStorage()

  const offlineId = api.session.getOfflineId(shop)
  const session = await sessionStorage.loadSession(offlineId)

  if (!session) {
    throw new Error(
      `No offline session found for shop "${shop}". The shop must install the app first.`
    )
  }

  const admin = createAdminApiContext(api, session)

  return { admin, session }
}
