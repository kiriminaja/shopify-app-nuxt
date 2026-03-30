<template>
  <s-search-field
    v-bind="$attrs"
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
  </s-search-field>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ShSearchField', inheritAttrs: false })

const props = defineProps<{
  maxLength?: number
  minLength?: number
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
  set: (v: string) => emit('update:modelValue', v),
})
</script>
