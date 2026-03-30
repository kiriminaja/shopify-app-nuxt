<template>
  <s-date-field
    v-bind="{ ...$attrs, ...$props }"
    :value="modelValue"
    @blur="emit('blur', $event)"
    @change="
      (evt: Event) => {
        emit('change', evt)
        value = (evt.currentTarget as HTMLInputElement)?.value || ''
      }
    "
    @focus="emit('focus', $event)"
    @input="emit('input', $event)"
    @invalid="emit('invalid', $event)"
    @viewchange="emit('viewchange', $event)"
  >
    <slot />
  </s-date-field>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ShDateField', inheritAttrs: false })

const props = defineProps<{
  allow?: string
  disallow?: string
  allowDays?: string
  disallowDays?: string
  view?: string
  defaultView?: string
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
  (
    e: 'blur' | 'change' | 'focus' | 'input' | 'invalid' | 'viewchange',
    event: Event
  ): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v)
})
</script>
