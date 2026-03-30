<template>
  <s-switch v-bind="$attrs">
    <slot />
  </s-switch>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShSwitch', inheritAttrs: false })

defineProps<{
  labelAccessibilityVisibility?: 'visible' | 'exclusive'
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
