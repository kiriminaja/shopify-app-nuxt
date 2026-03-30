<script setup lang="ts">
const shopifyFetch = useShopifyFetch()
const { data, error } = await useAsyncData(
  'settings',
  () => shopifyFetch('/api/shop'),
  { server: false }
)

definePageMeta({
  middleware: 'shopify-auth',
  layout: 'auth'
})
</script>

<template>
  <pre v-if="error">Error: {{ error }}</pre>
  <pre v-else>{{ JSON.stringify(data, null, 2) }}</pre>
</template>
