import { defineNuxtPlugin } from '#app'
import type { ShopifyGlobal } from '@shopify/app-bridge-types'
import { logger } from '../logger'

declare global {
  interface Window {
    shopify: ShopifyGlobal
  }
}

export default defineNuxtPlugin(() => {
  // The CDN script (injected via module head tags) exposes window.shopify.
  // This plugin provides typed access to it via $shopify.
  if (import.meta.server || typeof window === 'undefined') {
    return
  }

  // Use a Proxy so that property access is deferred to call time,
  // avoiding a race condition where window.shopify is not yet set
  // when the plugin initialises.
  const bridge = new Proxy({} as ShopifyGlobal, {
    get(_target, prop, receiver) {
      if (!window.shopify) {
        logger.warn({
          message: 'window.shopify is not available yet. The CDN script may not have loaded.'
        })
        throw new Error(
          'Shopify App Bridge is not available. Ensure the app is loaded inside the Shopify Admin.'
        )
      }
      return Reflect.get(window.shopify, prop, receiver)
    }
  })

  return {
    provide: {
      shopify: bridge
    }
  }
})
