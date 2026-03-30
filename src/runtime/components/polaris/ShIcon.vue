<template>
  <s-icon v-bind="polarisAttrs">
    <slot />
  </s-icon>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShIcon', inheritAttrs: false })

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
  type?: string
  size?: 'small' | 'base'
  interestFor?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
