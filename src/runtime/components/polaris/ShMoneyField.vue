<template>
  <s-money-field v-bind="$attrs">
    <slot />
  </s-money-field>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShMoneyField', inheritAttrs: false })

defineProps<{
  max?: number
  min?: number
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
