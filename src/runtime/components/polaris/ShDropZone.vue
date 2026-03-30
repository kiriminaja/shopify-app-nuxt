<template>
  <s-drop-zone
    v-bind="$attrs"
    @change="emit('change', $event)"
    @droprejected="emit('droprejected', $event)"
    @input="emit('input', $event)"
  >
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

const emit = defineEmits<{
  change: [event: Event]
  droprejected: [event: Event]
  input: [event: Event]
}>()
</script>
