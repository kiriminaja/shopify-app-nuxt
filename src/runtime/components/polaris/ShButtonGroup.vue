<template>
  <s-button-group v-bind="$attrs">
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
