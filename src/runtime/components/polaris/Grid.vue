<template>
  <s-grid v-bind="polarisAttrs">
    <slot />
  </s-grid>
</template>

<script setup lang="ts">
import type {
  AlignContentKeyword,
  AlignItemsKeyword,
  BackgroundColorKeyword,
  BlockSizeShorthand,
  BorderRadiusShorthand,
  BorderShorthand,
  BorderStyleShorthand,
  BorderWidthShorthand,
  ColorKeyword,
  InlineSizeShorthand,
  JustifyContentKeyword,
  JustifyItemsKeyword,
  MaxBlockSizeShorthand,
  MaxInlineSizeShorthand,
  MaybeResponsive,
  MaybeTwoValuesShorthandProperty,
  MinBlockSizeShorthand,
  MinInlineSizeShorthand,
  PaddingBlockOrInlineShorthand,
  PaddingShorthand,
  PaddingStartOrEndShorthand,
  SpacingKeyword
} from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  gridTemplateColumns?: MaybeResponsive<string>
  gridTemplateRows?: MaybeResponsive<string>
  justifyItems?: MaybeResponsive<JustifyItemsKeyword | ''>
  justifyContent?: JustifyContentKeyword
  alignItems?: AlignItemsKeyword
  alignContent?: AlignContentKeyword
  placeItems?: MaybeResponsive<
    `${AlignItemsKeyword} ${JustifyItemsKeyword}` | AlignItemsKeyword
  >
  placeContent?:
    | `${AlignContentKeyword} ${JustifyContentKeyword}`
    | AlignContentKeyword
  gap?: MaybeResponsive<MaybeTwoValuesShorthandProperty<SpacingKeyword>>
  rowGap?: MaybeResponsive<SpacingKeyword | ''>
  columnGap?: MaybeResponsive<SpacingKeyword | ''>
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
