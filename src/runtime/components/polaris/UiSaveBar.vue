<template>
  <ui-save-bar
    v-bind="polarisAttrs"
    @show="emit('show', $event)"
    @hide="emit('hide', $event)"
  >
    <button
      v-if="primaryAction"
      variant="primary"
      @click="primaryAction.onClick"
    >
      {{ primaryAction.label }}
    </button>
    <button
      v-if="secondaryAction"
      variant="secondary"
      @click="secondaryAction.onClick"
    >
      {{ secondaryAction.label }}
    </button>
  </ui-save-bar>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShUiSaveBar', inheritAttrs: false })

const props = defineProps<{
  id: string
  discardConfirmation?: boolean,
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}>()

const emit = defineEmits<{
  (e: 'show' | 'hide', event: Event): void
}>()

const polarisAttrs = usePolarisAttrs(props, ['primaryAction', 'secondaryAction'])
</script>
