<template>
  <s-page v-bind="polarisAttrs">
    <slot />
  </s-page>
</template>

<script setup lang="ts">
import type { SizeKeyword } from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  inlineSize?: Extract<SizeKeyword, 'base' | 'large' | 'small'>
  heading?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
