<template>
  <s-badge v-bind="polarisAttrs">
    <slot />
  </s-badge>
</template>

<script setup lang="ts">
import type { PolarisIcon } from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  content?: string
  progress?: string
  tone?: string
  icon?: PolarisIcon
  size?: 'base' | 'large'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
