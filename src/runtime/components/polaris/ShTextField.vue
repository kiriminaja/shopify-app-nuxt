<template>
  <s-text-field v-bind="$attrs">
    <slot />
  </s-text-field>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTextField', inheritAttrs: false })

defineProps<{
  icon?: string
  maxLength?: number
  minLength?: number
  prefix?: string
  suffix?: string
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
