import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()
  const shopifyConfig = (config.public as any).shopify || {}
  const apiKey = shopifyConfig.apiKey

  if (!apiKey) {
    return
  }

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
