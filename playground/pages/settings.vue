<script setup lang="ts">
const { data } = await useAsyncData('settings', () => $fetch('/api/shop'))
</script>

<template>
  <pre>{{ data }}</pre>
</template>
