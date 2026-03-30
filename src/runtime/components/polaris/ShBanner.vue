<template>
  <s-banner v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-banner>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShBanner', inheritAttrs: false })

defineProps<{
  heading?: string
  tone?: 'info' | 'success' | 'warning' | 'critical' | 'auto'
  hidden?: boolean
  dismissible?: boolean
}>()
</script>
