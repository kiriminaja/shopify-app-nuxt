<template>
  <s-modal v-bind="polarisAttrs">
    <slot />
  </s-modal>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShModal', inheritAttrs: false })

const props = defineProps<{
  accessibilityLabel?: string
  heading?: string
  padding?: 'base' | 'none'
  size?: 'small' | 'small-100' | 'base' | 'large' | 'large-100'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
