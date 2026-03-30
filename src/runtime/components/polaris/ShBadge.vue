<template>
  <s-badge v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-badge>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShBadge', inheritAttrs: false })

defineProps<{
  content?: string
  progress?: string
  tone?: string
  icon?: string
  size?: 'base' | 'large'
}>()
</script>
