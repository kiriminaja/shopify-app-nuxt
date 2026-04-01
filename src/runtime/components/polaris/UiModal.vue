<template>
  <ui-modal
    v-bind="polarisAttrs"
    @show="emit('show', $event)"
    @hide="emit('hide', $event)"
  >
    <slot />
    <slot name="title-bar" />
    <slot name="save-bar" />
  </ui-modal>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  id: string
  variant?: 'small' | 'base' | 'large' | 'max'
  src?: string
}>()

const emit = defineEmits<{
  (e: 'show' | 'hide', event: Event): void
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
