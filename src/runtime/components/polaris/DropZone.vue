<template>
  <s-drop-zone
    v-bind="polarisAttrs"
    :value="modelValue"
    @change="
      (evt: Event) => {
        emit('change', evt)
        value = (evt.currentTarget as HTMLInputElement)?.value || ''
      }
    "
    @droprejected="emit('droprejected', $event)"
    @input="emit('input', $event)"
  >
    <slot />
  </s-drop-zone>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShDropZone', inheritAttrs: false })

const props = defineProps<{
  accept?: string
  accessibilityLabel?: string
  disabled?: boolean
  error?: string
  label?: string
  labelAccessibilityVisibility?: 'visible' | 'exclusive'
  multiple?: boolean
  name?: string
  required?: boolean
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'change' | 'droprejected' | 'input', event: Event): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v)
})
const polarisAttrs = usePolarisAttrs(props, ['modelValue'])
</script>
