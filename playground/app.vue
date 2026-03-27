<template>
  <ShopifyAppProvider>
    <div>
      <h1>Shopify Nuxt Playground</h1>
      <p>This app is loaded inside the Shopify Admin.</p>
    </div>
    <button @click="openToast">Try Button</button>
  </ShopifyAppProvider>
</template>

<script setup lang="ts">
import { useAppBridge } from '#imports'

const openToast = () => {
  const shopify = useAppBridge()

  const isEmbedded = window.self !== window.top
  console.info('Shopify App Bridge instance:', shopify.config.shop)
  console.info('App is embedded in iframe:', isEmbedded)

  if (!isEmbedded) {
    console.warn('Toast requires the app to be loaded inside the Shopify Admin iframe.')
  }

  shopify.toast.show('Hello from Shopify App Bridge!')
}
</script>
