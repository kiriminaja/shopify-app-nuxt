<template>
  <s-icon v-bind="polarisAttrs">
    <slot />
  </s-icon>
</template>

<script setup lang="ts">
import type {
  ColorKeyword,
  PolarisIcon,
  SizeKeyword,
  ToneKeyword
} from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  color?: Extract<ColorKeyword, 'base' | 'subdued'>
  tone?: Extract<
    ToneKeyword,
    'auto' | 'neutral' | 'info' | 'success' | 'caution' | 'warning' | 'critical'
  >
  type?: PolarisIcon | 'empty'
  size?: Extract<SizeKeyword, 'small' | 'base'>
  interestFor?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
