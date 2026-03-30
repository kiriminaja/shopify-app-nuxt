<template>
  <s-page v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShPage', inheritAttrs: false })

defineProps<{
  inlineSize?: 'small' | 'base' | 'large'
  heading?: string
}>()
</script>
