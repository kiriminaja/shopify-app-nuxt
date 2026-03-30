import { useNuxtApp } from '#app'
import type { ShopifyGlobal } from '@shopify/app-bridge-types'

export function useShopifyFetch() {
  if (import.meta.server) {
    // Return a no-op on server — use with `server: false` in useAsyncData
    return async (_url: string, _options?: RequestInit) => {
      return { data: null, response: null as unknown as Response }
    }
  }

  const nuxtApp = useNuxtApp()

  return async (url: string, options: RequestInit = {}) => {
    const shopify = nuxtApp.$shopify as ShopifyGlobal | undefined

    if (!shopify) {
      throw new Error(
        'Shopify App Bridge is not available. Make sure the app is loaded within the Shopify Admin.'
      )
    }

    const token = await shopify.idToken()

    const headers = new Headers(options.headers || {})
    headers.set('Authorization', `Bearer ${token}`)

    const response = await fetch(url, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(
        `Shopify fetch failed: ${response.status} ${response.statusText}`
      )
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return { data: await response.json(), response }
    }

    return { data: await response.text(), response }
  }
}
