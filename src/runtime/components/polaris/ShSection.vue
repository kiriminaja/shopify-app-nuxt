<template>
  <s-section v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-section>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShSection', inheritAttrs: false })

defineProps<{
  accessibilityLabel?: string
  heading?: string
  padding?: 'base' | 'none'
}>()
</script>
