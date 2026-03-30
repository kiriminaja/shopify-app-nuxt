<template>
  <s-spinner v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-spinner>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShSpinner', inheritAttrs: false })

defineProps<{
  accessibilityLabel?: string
  size?: 'base' | 'large' | 'large-100'
}>()
</script>
