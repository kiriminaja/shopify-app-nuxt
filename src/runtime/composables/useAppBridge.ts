/**
 * Composable to access the Shopify App Bridge instance in the browser.
 *
 * ```vue
 * <script setup>
 * const shopify = useAppBridge()
 *
 * // Get a session token
 * const token = await shopify.idToken()
 *
 * // Use toast
 * shopify.toast.show('Product saved!')
 * </script>
 * ```
 */
export function useAppBridge() {
  if (import.meta.server) {
    throw new Error('useAppBridge() can only be used on the client side')
  }

  const shopify = (window as any).shopify

  if (!shopify) {
    throw new Error(
      'Shopify App Bridge is not available. Make sure the app is loaded within the Shopify Admin.'
    )
  }

  return shopify
}
