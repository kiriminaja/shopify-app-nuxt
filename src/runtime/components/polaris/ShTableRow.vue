<template>
  <s-table-row v-bind="polarisAttrs">
    <slot />
  </s-table-row>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShTableRow', inheritAttrs: false })

const props = defineProps<{
  clickDelegate?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
