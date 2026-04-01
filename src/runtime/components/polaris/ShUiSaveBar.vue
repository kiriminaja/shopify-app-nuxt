<template>
  <ui-save-bar
    v-bind="polarisAttrs"
    @show="emit('show', $event)"
    @hide="emit('hide', $event)"
  >
    <slot />
  </ui-save-bar>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShUiSaveBar', inheritAttrs: false })

const props = defineProps<{
  id: string
  discardConfirmation?: boolean
}>()

const emit = defineEmits<{
  (e: 'show' | 'hide', event: Event): void
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
