<template>
  <s-date-picker v-bind="$attrs">
    <slot />
  </s-date-picker>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShDatePicker', inheritAttrs: false })

defineProps<{
  defaultView?: string
  view?: string
  allow?: string
  disallow?: string
  allowDays?: string
  disallowDays?: string
  type?: 'single' | 'range'
  defaultValue?: string
  name?: string
  value?: string
}>()
</script>
