<template>
  <s-chip v-bind="polarisAttrs">
    <slot />
  </s-chip>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShChip', inheritAttrs: false })

const props = defineProps<{
  color?: string
  accessibilityLabel?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
