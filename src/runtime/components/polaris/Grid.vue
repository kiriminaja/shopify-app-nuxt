<template>
  <s-grid v-bind="polarisAttrs">
    <slot />
  </s-grid>
</template>

<script setup lang="ts">
import type {
  BlockSizeShorthand,
  BorderRadiusShorthand,
  BorderShorthand,
  BorderStyleShorthand,
  BorderWidthShorthand,
  ColorKeyword,
  InlineSizeShorthand,
  MaxBlockSizeShorthand,
  MaxInlineSizeShorthand,
  MinBlockSizeShorthand,
  MinInlineSizeShorthand
} from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

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
  blockSize?: BlockSizeShorthand
  minBlockSize?: MinBlockSizeShorthand
  maxBlockSize?: MaxBlockSizeShorthand
  inlineSize?: InlineSizeShorthand
  minInlineSize?: MinInlineSizeShorthand
  maxInlineSize?: MaxInlineSizeShorthand
  overflow?: 'visible' | 'hidden'
  padding?: string
  paddingBlock?: string
  paddingBlockStart?: string
  paddingBlockEnd?: string
  paddingInline?: string
  paddingInlineStart?: string
  paddingInlineEnd?: string
  border?: BorderShorthand
  borderWidth?: BorderWidthShorthand
  borderStyle?: BorderStyleShorthand
  borderColor?: ColorKeyword
  borderRadius?: BorderRadiusShorthand
  accessibilityLabel?: string
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive'
  display?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
