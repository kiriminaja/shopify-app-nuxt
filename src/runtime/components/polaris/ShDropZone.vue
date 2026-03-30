<template>
  <s-drop-zone v-bind="$attrs">
    <slot />
  </s-drop-zone>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShDropZone', inheritAttrs: false })

defineProps<{
  accept?: string
  accessibilityLabel?: string
  disabled?: boolean
  error?: string
  label?: string
  labelAccessibilityVisibility?: 'visible' | 'exclusive'
  multiple?: boolean
  name?: string
  required?: boolean
  value?: string
}>()
</script>
