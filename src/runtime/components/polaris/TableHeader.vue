<template>
  <s-table-header v-bind="polarisAttrs">
    <slot />
  </s-table-header>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  listSlot?: string
  format?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
