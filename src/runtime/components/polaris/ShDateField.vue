<template>
  <s-date-field
    v-bind="$attrs"
    @blur="emit('blur', $event)"
    @change="emit('change', $event)"
    @focus="emit('focus', $event)"
    @input="emit('input', $event)"
    @invalid="emit('invalid', $event)"
    @viewchange="emit('viewchange', $event)"
  >
    <slot />
  </s-date-field>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShDateField', inheritAttrs: false })

defineProps<{
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
  value?: string
}>()

const emit = defineEmits<{
  blur: [event: Event]
  change: [event: Event]
  focus: [event: Event]
  input: [event: Event]
  invalid: [event: Event]
  viewchange: [event: Event]
}>()
</script>
