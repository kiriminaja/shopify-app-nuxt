/**
 * Composable for making authenticated fetch calls to your app's server.
 *
 * Automatically includes the Shopify session token in the Authorization header,
 * so your server-side `useShopifyAdmin()` can authenticate the request.
 *
 * ```vue
 * <script setup>
 * const shopifyFetch = useShopifyFetch()
 *
 * const { data } = await shopifyFetch('/api/products')
 * </script>
 * ```
 */
export function useShopifyFetch() {
  if (import.meta.server) {
    throw new Error('useShopifyFetch() can only be used on the client side')
  }

  return async (url: string, options: RequestInit = {}) => {
    const shopify = (window as any).shopify

    if (!shopify) {
      throw new Error(
        'Shopify App Bridge is not available. Make sure the app is loaded within the Shopify Admin.'
      )
    }

    // Get a fresh session token
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
