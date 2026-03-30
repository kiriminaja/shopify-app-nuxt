<template>
  <s-option v-bind="polarisAttrs">
    <slot />
  </s-option>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShOption', inheritAttrs: false })

const props = defineProps<{
  selected?: boolean
  defaultSelected?: boolean
  value?: string
  disabled?: boolean
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
