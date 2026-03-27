import { useNuxtApp } from '#app'
import type { ShopifyGlobal } from '@shopify/app-bridge-types'

export function useShopifyFetch() {
  if (import.meta.server) {
    throw new Error('useShopifyFetch() can only be used on the client side')
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
