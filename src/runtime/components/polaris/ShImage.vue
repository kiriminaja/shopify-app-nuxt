<template>
  <s-image v-bind="$attrs">
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
