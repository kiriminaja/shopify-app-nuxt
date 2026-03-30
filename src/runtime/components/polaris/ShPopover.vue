<template>
  <s-popover v-bind="$attrs">
    <slot />
  </s-popover>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShPopover', inheritAttrs: false })

defineProps<{
  blockSize?: string
  minBlockSize?: string
  maxBlockSize?: string
  inlineSize?: string
  minInlineSize?: string
  maxInlineSize?: string
}>()
</script>
