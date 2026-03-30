<template>
  <s-query-container v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-query-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShQueryContainer', inheritAttrs: false })

defineProps<{
  containerName?: string
}>()
</script>
