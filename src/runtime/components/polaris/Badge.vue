<template>
  <s-badge v-bind="polarisAttrs">
    <slot />
  </s-badge>
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
  tone?: Extract<
    ToneKeyword,
    'auto' | 'neutral' | 'info' | 'success' | 'caution' | 'warning' | 'critical'
  >
  color: Extract<ColorKeyword, 'base' | 'strong'>
  icon?: PolarisIcon
  size?: Extract<SizeKeyword, 'base' | 'large' | 'large-100'>
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
