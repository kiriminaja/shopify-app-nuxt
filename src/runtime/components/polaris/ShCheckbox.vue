<template>
  <s-checkbox v-bind="$attrs">
    <slot />
  </s-checkbox>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShCheckbox', inheritAttrs: false })

defineProps<{
  indeterminate?: boolean
  defaultIndeterminate?: boolean
  checked?: boolean
  value?: string
  defaultChecked?: boolean
  accessibilityLabel?: string
  details?: string
  error?: string
  label?: string
  required?: boolean
  disabled?: boolean
  id?: string
  name?: string
}>()
</script>
