<template>
  <s-banner
    v-bind="polarisAttrs"
    @dismiss="emit('dismiss', $event)"
    @after-hide="emit('afterHide', $event)"
  >
    <slot />
  </s-banner>
</template>

<script setup lang="ts">
import type { ToneKeyword } from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  heading?: string
  tone?: ToneKeyword
  dismissible?: boolean
  hidden?: boolean
}>()

const polarisAttrs = usePolarisAttrs(props)

const emit = defineEmits<{
  (e: 'dismiss' | 'afterHide', event: Event): void
}>()
</script>
