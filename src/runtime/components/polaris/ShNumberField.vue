<template>
  <s-number-field
    v-bind="{ ...$attrs, ...$props }"
    :value="modelValue"
    @blur="emit('blur', $event)"
    @change="emit('change', $event)"
    @focus="emit('focus', $event)"
    @input="
      (evt: InputEvent) => {
        emit('input', evt)
        value = (evt.currentTarget as HTMLInputElement)?.value || ''
      }
    "
  >
    <slot />
  </s-number-field>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ShNumberField', inheritAttrs: false })

const props = defineProps<{
  inputMode?: 'decimal' | 'numeric'
  step?: number
  max?: number
  min?: number
  prefix?: string
  suffix?: string
  autocomplete?: string
  defaultValue?: string
  details?: string
  error?: string
  label?: string
  labelAccessibilityVisibility?: 'visible' | 'exclusive'
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  disabled?: boolean
  id?: string
  name?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'blur' | 'change' | 'focus' | 'input', event: InputEvent): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v)
})
</script>
