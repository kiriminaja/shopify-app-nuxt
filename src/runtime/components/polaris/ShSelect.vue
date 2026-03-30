<template>
  <s-select v-bind="$attrs">
    <slot />
  </s-select>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShSelect', inheritAttrs: false })

defineProps<{
  icon?: string
  details?: string
  error?: string
  label?: string
  placeholder?: string
  required?: boolean
  labelAccessibilityVisibility?: 'visible' | 'exclusive'
  value?: string
  disabled?: boolean
  id?: string
  name?: string
}>()
</script>
