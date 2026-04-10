<script setup lang="ts">
const { data, error } = await useAsyncData(
  'settings',
  () => useShopifyFetch('/api/shop'),
  { server: false }
)

definePageMeta({
  middleware: 'shopify-auth',
  layout: 'auth'
})
</script>

<template>
  <ShPage heading="Settings">
    <pre v-if="error">Error: {{ error }}</pre>
    <pre v-else>{{ JSON.stringify(data, null, 2) }}</pre>
  </ShPage>
</template>
