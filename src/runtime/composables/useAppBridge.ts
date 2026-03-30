import type { ShopifyGlobal } from '@shopify/app-bridge-types'

/**
 * Proxy that throws a helpful error when property access is attempted
 * in an environment where App Bridge is not available.
 */
function createUnavailableProxy(reason: string): ShopifyGlobal {
  return new Proxy({} as ShopifyGlobal, {
    get(_, prop) {
      if (typeof prop === 'symbol' || prop === 'then' || prop === 'toJSON') {
        return undefined
      }
      throw new Error(`shopify.${String(prop)} is not available: ${reason}`)
    }
  })
}

const serverProxy = createUnavailableProxy(
  'Cannot use App Bridge in a server environment. Move this code into an event handler or onMounted.'
)

const clientFallbackProxy = createUnavailableProxy(
  'The shopify global is not defined. You are likely outside the Shopify admin iframe.'
)

/**
 * Returns the `shopify` global variable to use App Bridge APIs
 * such as `toast` and `resourcePicker`.
 *
 * Safe to call in `app.vue` or layouts — returns a lazy proxy that only throws
 * when a property is actually accessed outside the Shopify admin context.
 *
 * @returns `shopify` variable or a Proxy that throws when a property is accessed in an unavailable context
 */
export function useAppBridge(): ShopifyGlobal {
  if (typeof window === 'undefined') {
    return serverProxy
  }
  // Return a lazy proxy so calling useAppBridge() never throws.
  // Only accessing shopify.someMethod() throws if App Bridge is unavailable.
  return new Proxy({} as ShopifyGlobal, {
    get(_, prop) {
      if (typeof prop === 'symbol' || prop === 'then' || prop === 'toJSON') {
        return undefined
      }
      if (window.shopify) {
        return (window.shopify as any)[prop]
      }
      return (clientFallbackProxy as any)[prop]
    }
  })
}
