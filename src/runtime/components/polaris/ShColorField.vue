<template>
  <s-color-field v-bind="$attrs">
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
</script>
