<script setup lang="ts">
const shopifyFetch = useShopifyFetch()
const { data } = await useAsyncData(
  'settings',
  () => shopifyFetch('/api/shop'),
  { server: false }
)
</script>

<template>
  <pre>{{ data }}</pre>
</template>
