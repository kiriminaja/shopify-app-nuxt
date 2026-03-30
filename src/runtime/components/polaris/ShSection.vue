<template>
  <s-section v-bind="polarisAttrs">
    <slot />
  </s-section>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShSection', inheritAttrs: false })

const props = defineProps<{
  accessibilityLabel?: string
  heading?: string
  padding?: 'base' | 'none'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
