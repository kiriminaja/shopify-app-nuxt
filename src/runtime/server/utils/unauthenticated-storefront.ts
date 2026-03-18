import { getShopifyApi, getSessionStorage } from '../services/shopify'
import type { Session } from '@shopify/shopify-api'

export interface StorefrontApiContext {
  graphql: (
    query: string,
    options?: { variables?: Record<string, any> }
  ) => Promise<any>
}

/**
 * Get an unauthenticated Storefront API context for a given shop.
 *
 * Uses the stored offline session to access the Storefront API without an incoming request.
 *
 * ```ts
 * // server/api/public/products.ts
 * export default defineEventHandler(async (event) => {
 *   const { storefront } = await useShopifyUnauthenticatedStorefront('my-shop.myshopify.com')
 *   const products = await storefront.graphql(`{ products(first: 10) { edges { node { id title } } } }`)
 *   return products
 * })
 * ```
 */
export async function useShopifyUnauthenticatedStorefront(
  shop: string
): Promise<{
  storefront: StorefrontApiContext
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

  const storefront: StorefrontApiContext = {
    graphql: async (
      query: string,
      options?: { variables?: Record<string, any> }
    ) => {
      const client = new api.clients.Storefront({ session })
      return client.request(query, {
        variables: options?.variables
      })
    }
  }

  return { storefront, session }
}
