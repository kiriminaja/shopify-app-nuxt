<template>
  <s-checkbox
    v-bind="$attrs"
    :checked="modelValue"
    @change="
      (evt: Event) => {
        emit('change', evt)
        value = (evt.currentTarget as HTMLInputElement)?.checked || false
      }
    "
    @input="emit('input', $event)"
  >
    <slot />
  </s-checkbox>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ShCheckbox', inheritAttrs: false })

const props = defineProps<{
  indeterminate?: boolean
  defaultIndeterminate?: boolean
  defaultChecked?: boolean
  accessibilityLabel?: string
  details?: string
  error?: string
  label?: string
  required?: boolean
  disabled?: boolean
  id?: string
  name?: string
  modelValue?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'change' | 'input', event: Event): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})
</script>
