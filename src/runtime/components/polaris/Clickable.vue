<template>
  <s-clickable v-bind="polarisAttrs">
    <slot />
  </s-clickable>
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
  disabled?: boolean
  loading?: boolean
  target?: 'auto' | '_blank' | '_self' | '_parent' | '_top' | (string & {})
  href?: string
  download?: string
  type?: 'button' | 'reset' | 'submit'
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
  command?: '--auto' | '--show' | '--hide' | '--toggle'
  commandFor?: string
  interestFor?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
