<template>
  <s-color-picker v-bind="$attrs">
    <slot />
  </s-color-picker>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShColorPicker', inheritAttrs: false })

defineProps<{
  alpha?: boolean
  name?: string
  defaultValue?: string
  value?: string
}>()
</script>
