<template>
  <s-grid-item v-bind="polarisAttrs">
    <slot />
  </s-grid-item>
</template>

<script setup lang="ts">
import type {
  BackgroundColorKeyword,
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
  MinInlineSizeShorthand,
  PaddingBlockOrInlineShorthand,
  PaddingShorthand,
  PaddingStartOrEndShorthand
} from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  gridColumn?: string
  gridRow?: string
  accessibilityRole?: string
  background?: Extract<
    BackgroundColorKeyword,
    'transparent' | 'base' | 'subdued' | 'strong'
  >
  blockSize?: BlockSizeShorthand
  minBlockSize?: MinBlockSizeShorthand
  maxBlockSize?: MaxBlockSizeShorthand
  inlineSize?: InlineSizeShorthand
  minInlineSize?: MinInlineSizeShorthand
  maxInlineSize?: MaxInlineSizeShorthand
  overflow?: 'visible' | 'hidden'
  padding?: PaddingShorthand
  paddingBlock?: PaddingBlockOrInlineShorthand
  paddingBlockStart?: PaddingStartOrEndShorthand
  paddingBlockEnd?: PaddingStartOrEndShorthand
  paddingInline?: PaddingBlockOrInlineShorthand
  paddingInlineStart?: PaddingStartOrEndShorthand
  paddingInlineEnd?: PaddingStartOrEndShorthand
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
