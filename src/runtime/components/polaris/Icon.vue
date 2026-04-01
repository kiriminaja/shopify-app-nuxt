<template>
  <s-icon v-bind="polarisAttrs">
    <slot />
  </s-icon>
</template>

<script setup lang="ts">
import type { PolarisIcon } from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  color?: 'base' | 'subdued'
  tone?:
    | 'info'
    | 'success'
    | 'warning'
    | 'critical'
    | 'auto'
    | 'neutral'
    | 'caution'
  type?: PolarisIcon
  size?: 'small' | 'base'
  interestFor?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
