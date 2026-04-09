<template>
  <s-avatar
    v-bind="polarisAttrs"
    @error="emit('error', $event)"
    @load="emit('load', $event)"
  >
    <slot />
  </s-avatar>
</template>

<script setup lang="ts">
import type { SizeKeyword } from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  initials?: string
  src?: string
  size?: SizeKeyword
  alt?: string
}>()

const polarisAttrs = usePolarisAttrs(props)

const emit = defineEmits<{
  (e: 'load' | 'error', event: Event): void
}>()
</script>
