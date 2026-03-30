<template>
  <s-spinner v-bind="polarisAttrs">
    <slot />
  </s-spinner>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShSpinner', inheritAttrs: false })

const props = defineProps<{
  accessibilityLabel?: string
  size?: 'base' | 'large' | 'large-100'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
