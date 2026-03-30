<template>
  <s-thumbnail v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-thumbnail>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShThumbnail', inheritAttrs: false })

defineProps<{
  src?: string
  alt?: string
  size?: 'small' | 'small-100' | 'small-200' | 'base' | 'large' | 'large-100'
}>()
</script>
