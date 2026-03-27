import type { ShopifyGlobal } from '@shopify/app-bridge-types'

export function useAppBridge(): ShopifyGlobal {
  if (typeof window === 'undefined' || !window.shopify) {
    console.warn(
      '[shopify-nuxt] useAppBridge() called but window.shopify is not available.'
    )
    throw new Error(
      'Shopify App Bridge is not available. Ensure the app is loaded inside the Shopify Admin.'
    )
  }
  console.log('[shopify-nuxt] useAppBridge() returning window.shopify')
  return window.shopify
}
