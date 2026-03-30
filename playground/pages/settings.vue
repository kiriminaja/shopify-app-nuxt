<script setup lang="ts">
const shopifyFetch = useShopifyFetch()
const { data, error } = await useAsyncData(
  'settings',
  () => shopifyFetch('/api/shop'),
  { server: false }
)
</script>

<template>
  <pre v-if="error">Error: {{ error }}</pre>
  <pre v-else>{{ data }}</pre>
</template>
