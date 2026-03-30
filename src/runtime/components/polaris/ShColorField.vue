<template>
  <s-color-field v-bind="$attrs" @blur="emit('blur', $event)" @change="emit('change', $event)" @focus="emit('focus', $event)" @input="emit('input', $event)">
    <slot />
  </s-color-field>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShColorField', inheritAttrs: false })

defineProps<{
  alpha?: boolean
  value?: string
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
}>()

const emit = defineEmits<{
  blur: [event: Event]
  change: [event: Event]
  focus: [event: Event]
  input: [event: Event]
}>()
</script>
