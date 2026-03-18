import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import createApp from '@shopify/app-bridge'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()
  const apiKey = (config.public as any).shopify?.apiKey

  if (!apiKey) {
    return
  }

  // The host param is provided by Shopify as a base64-encoded value in the URL
  const host = new URLSearchParams(window.location.search).get('host') || ''

  const app = createApp({ apiKey, host })

  return {
    provide: {
      shopifyBridge: app
    }
  }
})
