<template>
  <s-chip v-bind="polarisAttrs">
    <slot />
  </s-chip>
</template>

<script setup lang="ts">
import type { ColorKeyword } from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  color?: ColorKeyword
  accessibilityLabel?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
