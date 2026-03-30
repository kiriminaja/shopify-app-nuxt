<template>
  <s-grid-item v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-grid-item>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShGridItem', inheritAttrs: false })

defineProps<{
  gridColumn?: string
  gridRow?: string
  accessibilityRole?: string
  background?: string
  blockSize?: string
  minBlockSize?: string
  maxBlockSize?: string
  inlineSize?: string
  minInlineSize?: string
  maxInlineSize?: string
  overflow?: 'visible' | 'hidden'
  padding?: string
  paddingBlock?: string
  paddingBlockStart?: string
  paddingBlockEnd?: string
  paddingInline?: string
  paddingInlineStart?: string
  paddingInlineEnd?: string
  border?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  accessibilityLabel?: string
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive'
  display?: string
}>()
</script>
