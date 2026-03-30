<template>
  <s-option v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-option>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShOption', inheritAttrs: false })

defineProps<{
  selected?: boolean
  defaultSelected?: boolean
  value?: string
  disabled?: boolean
}>()
</script>
