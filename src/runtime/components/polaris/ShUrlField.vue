<template>
  <s-url-field
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
  </s-url-field>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ShUrlField', inheritAttrs: false })

const props = defineProps<{
  autocomplete?: string
  maxLength?: number
  minLength?: number
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
