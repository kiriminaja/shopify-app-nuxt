<template>
  <s-grid-item v-bind="polarisAttrs">
    <slot />
  </s-grid-item>
</template>

<script setup lang="ts">
import type {
  BorderRadiusShorthand,
  BorderShorthand,
  BorderStyleShorthand,
  BorderWidthShorthand,
  ColorKeyword
} from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
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
