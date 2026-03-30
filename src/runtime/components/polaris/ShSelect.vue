<template>
  <s-select
    v-bind="polarisAttrs"
    :value="modelValue"
    @change="
      (evt: Event) => {
        emit('change', evt)
        value = (evt.currentTarget as HTMLSelectElement)?.value || ''
      }
    "
    @input="emit('input', $event)"
  >
    <slot />
  </s-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShSelect', inheritAttrs: false })

const props = defineProps<{
  icon?: string
  details?: string
  error?: string
  label?: string
  placeholder?: string
  required?: boolean
  labelAccessibilityVisibility?: 'visible' | 'exclusive'
  disabled?: boolean
  id?: string
  name?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'change' | 'input', event: Event): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v)
})
const polarisAttrs = usePolarisAttrs(props, ['modelValue'])
</script>
