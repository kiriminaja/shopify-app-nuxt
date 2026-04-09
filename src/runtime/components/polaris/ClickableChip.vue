<template>
  <s-clickable-chip
    v-bind="polarisAttrs"
    @click="emit('click', $event)"
    @remove="emit('remove', $event)"
    @after-hide="emit('afterHide', $event)"
  >
    <slot />
  </s-clickable-chip>
</template>

<script setup lang="ts">
import type { ColorKeyword } from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  color?: ColorKeyword
  accessibilityLabel?: string
  removable?: boolean
  hidden?: boolean
  disabled?: boolean
  href?: string
  command?: '--auto' | '--show' | '--hide' | '--toggle'
  commandFor?: string
  interestFor?: string
}>()

const polarisAttrs = usePolarisAttrs(props)

const emit = defineEmits<{
  (e: 'click' | 'remove' | 'afterHide', event: Event): void
}>()
</script>
