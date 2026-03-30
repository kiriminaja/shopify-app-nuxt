<template>
  <s-tooltip v-bind="polarisAttrs">
    <slot />
  </s-tooltip>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShTooltip', inheritAttrs: false })

const props = defineProps<{
  id: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
