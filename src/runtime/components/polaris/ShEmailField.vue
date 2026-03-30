<template>
  <s-email-field v-bind="$attrs">
    <slot />
  </s-email-field>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShEmailField', inheritAttrs: false })

defineProps<{
  autocomplete?: string
  maxLength?: number
  minLength?: number
  value?: string
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
