<template>
  <s-color-picker
    v-bind="$attrs"
    :value="modelValue"
    @change="
      (evt: Event) => {
        emit('change', evt)
        value = (evt.currentTarget as HTMLInputElement)?.value || ''
      }
    "
    @input="emit('input', $event)"
  >
    <slot />
  </s-color-picker>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ShColorPicker', inheritAttrs: false })

const props = defineProps<{
  alpha?: boolean
  name?: string
  defaultValue?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'change' | 'input', event: Event): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v),
})
</script>
