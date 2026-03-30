<template>
  <s-date-field v-bind="$attrs">
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
</script>
