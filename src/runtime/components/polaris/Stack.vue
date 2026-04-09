<template>
  <s-stack v-bind="polarisAttrs">
    <slot />
  </s-stack>
</template>

<script setup lang="ts">
import type {
  AlignContentKeyword,
  AlignItemsKeyword,
  BackgroundColorKeyword,
  BorderRadiusShorthand,
  BorderShorthand,
  BorderStyleShorthand,
  BorderWidthShorthand,
  ColorKeyword,
  InlineSizeShorthand,
  JustifyContentKeyword,
  MaxInlineSizeShorthand,
  MaybeResponsive,
  MinInlineSizeShorthand
} from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  direction?: MaybeResponsive<'block' | 'inline'>
  justifyContent?: JustifyContentKeyword
  alignItems?: AlignItemsKeyword
  alignContent?: AlignContentKeyword
  gap?: string
  rowGap?: string
  columnGap?: string
  accessibilityRole?: string
  background?: Extract<
    BackgroundColorKeyword,
    'transparent' | 'base' | 'subdued' | 'strong'
  >
  blockSize?: string
  minBlockSize?: string
  maxBlockSize?: string
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
