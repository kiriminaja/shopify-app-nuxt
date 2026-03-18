import { useNuxtApp } from '#app'

export function useAppBridge() {
  const nuxtApp = useNuxtApp()
  const bridge = nuxtApp.$shopifyBridge

  if (!bridge) {
    throw new Error(
      'Shopify App Bridge is not available. Make sure the app is loaded within the Shopify Admin.'
    )
  }

  return bridge
}
