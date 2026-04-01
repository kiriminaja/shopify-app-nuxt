<template>
  <s-grid v-bind="polarisAttrs">
    <slot />
  </s-grid>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShGrid', inheritAttrs: false })

const props = defineProps<{
  gridTemplateColumns?: string
  gridTemplateRows?: string
  justifyItems?: string
  alignItems?: string
  placeItems?: string
  justifyContent?: string
  alignContent?: string
  placeContent?: string
  gap?: string
  rowGap?: string
  columnGap?: string
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

const polarisAttrs = usePolarisAttrs(props)
</script>
