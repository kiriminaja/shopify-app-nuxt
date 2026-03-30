<template>
  <s-select v-bind="$attrs" @change="emit('change', $event)" @input="emit('input', $event)">
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

const emit = defineEmits<{
  change: [event: Event]
  input: [event: Event]
}>()
</script>
