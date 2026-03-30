<template>
  <s-modal v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-modal>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShModal', inheritAttrs: false })

defineProps<{
  accessibilityLabel?: string
  heading?: string
  padding?: 'base' | 'none'
  size?: 'small' | 'small-100' | 'base' | 'large' | 'large-100'
}>()
</script>
