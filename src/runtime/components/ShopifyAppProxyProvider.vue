<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ShopifyAppProxyProvider wraps components rendered through Shopify App Proxy.
 *
 * App Proxy pages are served on the merchant's storefront domain and
 * are NOT embedded in the Shopify Admin iframe.
 *
 * ```vue
 * <template>
 *   <ShopifyAppProxyProvider>
 *     <h1>My App Proxy Page</h1>
 *   </ShopifyAppProxyProvider>
 * </template>
 * ```
 */

defineOptions({
  name: 'ShopifyAppProxyProvider'
})
</script>
