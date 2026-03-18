import { useNuxtApp } from '#app'
import type { ShopifyGlobal } from '@shopify/app-bridge-types'

export function useAppBridge(): ShopifyGlobal {
  const nuxtApp = useNuxtApp()
  const bridge = nuxtApp.$shopifyBridge as ShopifyGlobal | undefined

  if (!bridge) {
    throw new Error(
      'Shopify App Bridge is not available. Make sure the app is loaded within the Shopify Admin.'
    )
  }

  return bridge
}
