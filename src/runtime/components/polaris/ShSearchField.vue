<template>
  <s-search-field v-bind="$attrs">
    <slot />
  </s-search-field>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShSearchField', inheritAttrs: false })

defineProps<{
  maxLength?: number
  minLength?: number
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
