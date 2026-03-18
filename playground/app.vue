<template>
  <ShopifyAppProvider>
    <div>
      <h1>Shopify Nuxt Playground</h1>
      <p>This app is loaded inside the Shopify Admin.</p>
    </div>
  </ShopifyAppProvider>
</template>

<script setup lang="ts">
const { $shopifyBridge } = useNuxtApp()

onMounted(() => {
  $shopifyBridge.saveBar.show('Hello from the Shopify Nuxt Playground!')
})
</script>
