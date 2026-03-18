import { defineNuxtPlugin } from '#app'
import type { ShopifyGlobal } from '@shopify/app-bridge-types'

declare global {
  interface Window {
    shopify: ShopifyGlobal
  }
}

export default defineNuxtPlugin(() => {
  // The CDN script (injected via module head tags) exposes window.shopify.
  // This plugin provides typed access to it via $shopifyBridge.
  if (import.meta.server || typeof window === 'undefined') {
    return
  }

  return {
    provide: {
      shopifyBridge: window.shopify
    }
  }
})
