<template>
  <s-popover v-bind="polarisAttrs">
    <slot />
  </s-popover>
</template>

<script setup lang="ts">
import type {
  BlockSizeShorthand,
  InlineSizeShorthand,
  MaxBlockSizeShorthand,
  MaxInlineSizeShorthand,
  MinBlockSizeShorthand,
  MinInlineSizeShorthand
} from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  id: string
  blockSize?: BlockSizeShorthand
  minBlockSize?: MinBlockSizeShorthand
  maxBlockSize?: MaxBlockSizeShorthand
  inlineSize?: InlineSizeShorthand
  minInlineSize?: MinInlineSizeShorthand
  maxInlineSize?: MaxInlineSizeShorthand
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
