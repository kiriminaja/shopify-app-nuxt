<template>
  <s-choice v-bind="polarisAttrs">
    <slot />
  </s-choice>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShChoice', inheritAttrs: false })

const props = defineProps<{
  disabled?: boolean
  selected?: boolean
  value?: string
  accessibilityLabel?: string
  defaultSelected?: boolean
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
