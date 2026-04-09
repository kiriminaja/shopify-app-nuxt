<template>
  <s-clickable v-bind="polarisAttrs">
    <slot />
  </s-clickable>
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
  disabled?: boolean
  loading?: boolean
  target?: 'auto' | '_blank' | '_self' | '_parent' | '_top' | (string & {})
  href?: string
  download?: string
  type?: 'button' | 'reset' | 'submit'
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
  command?: '--auto' | '--show' | '--hide' | '--toggle'
  commandFor?: string
  interestFor?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
