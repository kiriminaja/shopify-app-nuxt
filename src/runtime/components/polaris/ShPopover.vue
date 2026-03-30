<template>
  <s-popover v-bind="polarisAttrs">
    <slot />
  </s-popover>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShPopover', inheritAttrs: false })

const props = defineProps<{
  id: string
  blockSize?: string
  minBlockSize?: string
  maxBlockSize?: string
  inlineSize?: string
  minInlineSize?: string
  maxInlineSize?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
