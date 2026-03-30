<template>
  <ui-modal
    ref="modalRef"
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
import { ref } from 'vue'
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShUiModal', inheritAttrs: false })

const props = defineProps<{
  id?: string
  variant?: 'small' | 'base' | 'large' | 'max'
  src?: string
}>()

const emit = defineEmits<{
  (e: 'show' | 'hide', event: Event): void
}>()

const polarisAttrs = usePolarisAttrs(props)

const modalRef = ref<HTMLElement | null>(null)

function getEl() {
  return modalRef.value as any
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

defineExpose({ show, hide, toggle, el: modalRef })
</script>
