<template>
  <ui-save-bar
    ref="saveBarRef"
    v-bind="polarisAttrs"
    @show="emit('show', $event)"
    @hide="emit('hide', $event)"
  >
    <slot />
  </ui-save-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShUiSaveBar', inheritAttrs: false })

const props = defineProps<{
  id?: string
  discardConfirmation?: boolean
}>()

const emit = defineEmits<{
  (e: 'show' | 'hide', event: Event): void
}>()

const polarisAttrs = usePolarisAttrs(props)

const saveBarRef = ref<HTMLElement | null>(null)

function getEl() {
  return saveBarRef.value as any
}

function show() {
  return getEl()?.show?.()
}

function hide() {
  return getEl()?.hide?.()
}

function toggle() {
  return getEl()?.toggle?.()
}

defineExpose({ show, hide, toggle, el: saveBarRef })
</script>
