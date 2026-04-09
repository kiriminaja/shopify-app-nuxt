<template>
  <s-box v-bind="polarisAttrs">
    <slot />
  </s-box>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'
import type {
  BorderRadiusShorthand,
  BorderShorthand,
  BorderStyleShorthand,
  BorderWidthShorthand,
  ColorKeyword
} from '../../types'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
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
