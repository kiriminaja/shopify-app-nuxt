<template>
  <s-date-picker
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
    @viewchange="emit('viewchange', $event)"
  >
    <slot />
  </s-date-picker>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ShDatePicker', inheritAttrs: false })

const props = defineProps<{
  defaultView?: string
  view?: string
  allow?: string
  disallow?: string
  allowDays?: string
  disallowDays?: string
  type?: 'single' | 'range'
  defaultValue?: string
  name?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'blur' | 'change' | 'focus' | 'input' | 'viewchange', event: Event): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v)
})
</script>
