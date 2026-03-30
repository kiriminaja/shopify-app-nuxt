<template>
  <s-choice v-bind="$attrs">
    <slot />
  </s-choice>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShChoice', inheritAttrs: false })

defineProps<{
  disabled?: boolean
  selected?: boolean
  value?: string
  accessibilityLabel?: string
  defaultSelected?: boolean
}>()
</script>
