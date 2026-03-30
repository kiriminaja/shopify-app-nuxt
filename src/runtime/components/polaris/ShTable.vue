<template>
  <s-table v-bind="polarisAttrs">
    <slot />
  </s-table>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShTable', inheritAttrs: false })

const props = defineProps<{
  variant?: 'auto' | 'list'
  loading?: boolean
  paginate?: boolean
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
