import type { ShopifyGlobal } from '@shopify/app-bridge-types'

/**
 * This proxy is used to throw a helpful error message when trying to access
 * the `shopify` global in a server environment.
 */
const serverProxy = new Proxy(
  {},
  {
    get(_, prop) {
      throw new Error(
        `shopify.${String(prop)} can't be used in a server environment. You likely need to move this code into an event handler or onMounted.`
      )
    }
  }
)

/**
 * Returns the `shopify` global variable to use App Bridge APIs
 * such as `toast` and `resourcePicker`.
 *
 * @returns `shopify` variable or a Proxy that throws when incorrectly accessed in a server context
 */
export function useAppBridge(): ShopifyGlobal {
  if (typeof window === 'undefined') {
    return serverProxy as unknown as ShopifyGlobal
  }
  if (!window.shopify) {
    throw new Error(
      'The shopify global is not defined. This likely means the App Bridge script tag was not added correctly to this page'
    )
  }
  return window.shopify
}
