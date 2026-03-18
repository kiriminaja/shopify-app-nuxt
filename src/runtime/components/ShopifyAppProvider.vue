<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ShopifyAppProvider wraps your app's root component to ensure
 * App Bridge is initialized and the app can communicate with the Shopify Admin.
 *
 * ```vue
 * <template>
 *   <ShopifyAppProvider>
 *     <NuxtPage />
 *   </ShopifyAppProvider>
 * </template>
 * ```
 */

defineOptions({
  name: 'ShopifyAppProvider'
})

// App Bridge is initialized by the app-bridge.client plugin
// This component is primarily a semantic wrapper and can be extended for
// additional Shopify-specific setup (e.g., navigation, loading states)
</script>
