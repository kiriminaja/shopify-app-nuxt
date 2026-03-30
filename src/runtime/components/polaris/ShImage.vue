<template>
  <s-image v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-image>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShImage', inheritAttrs: false })

defineProps<{
  id?: string
  originalSrc?: string
  altText?: string
}>()
</script>
