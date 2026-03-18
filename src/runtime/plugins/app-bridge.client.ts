import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#app'

/**
 * Client-side plugin that loads the Shopify App Bridge for embedded apps.
 * This is automatically registered by the shopify-nuxt module.
 */
export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()
  const shopifyConfig = (config.public as any).shopify || {}
  const apiKey = shopifyConfig.apiKey

  if (!apiKey) {
    console.warn(
      '[shopify-nuxt] No apiKey found in public runtime config. App Bridge will not be loaded.'
    )
    return
  }

  // Inject the App Bridge script and API key meta tag
  useHead({
    meta: [{ name: 'shopify-api-key', content: apiKey }],
    script: [
      {
        src: 'https://cdn.shopify.com/shopifycloud/app-bridge.js',
        tagPosition: 'head'
      }
    ]
  })
})
