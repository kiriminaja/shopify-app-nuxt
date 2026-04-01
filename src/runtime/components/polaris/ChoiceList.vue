<template>
  <s-choice-list
    v-bind="polarisAttrs"
    :values="modelValue"
    @change="
      (evt: Event) => {
        emit('change', evt)
        value = (evt.currentTarget as any)?.values || []
      }
    "
    @input="emit('input', $event)"
  >
    <slot />
  </s-choice-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShChoiceList', inheritAttrs: false })

const props = defineProps<{
  disabled?: boolean
  name?: string
  error?: string
  details?: string
  multiple?: boolean
  label?: string
  labelAccessibilityVisibility?: 'visible' | 'exclusive'
  modelValue?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string[]): void
  (e: 'change' | 'input', event: Event): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string[]) => emit('update:modelValue', v)
})
const polarisAttrs = usePolarisAttrs(props, ['modelValue'])
</script>
