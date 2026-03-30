<template>
  <s-text-area v-bind="$attrs">
    <slot />
  </s-text-area>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTextArea', inheritAttrs: false })

defineProps<{
  maxLength?: number
  minLength?: number
  rows?: number
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
</script>
