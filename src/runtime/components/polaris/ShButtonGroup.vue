<template>
  <s-button-group v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-button-group>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShButtonGroup', inheritAttrs: false })

defineProps<{
  gap?: 'base' | 'none'
  accessibilityLabel?: string
}>()
</script>
