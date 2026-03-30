<template>
  <s-number-field v-bind="$attrs">
    <slot />
  </s-number-field>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShNumberField', inheritAttrs: false })

defineProps<{
  value?: string
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
}>()
</script>
