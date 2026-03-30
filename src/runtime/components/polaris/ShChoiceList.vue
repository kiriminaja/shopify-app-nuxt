<template>
  <s-choice-list
    v-bind="$attrs"
    @change="emit('change', $event)"
    @input="emit('input', $event)"
  >
    <slot />
  </s-choice-list>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShChoiceList', inheritAttrs: false })

defineProps<{
  disabled?: boolean
  name?: string
  error?: string
  details?: string
  multiple?: boolean
  label?: string
  labelAccessibilityVisibility?: 'visible' | 'exclusive'
  values?: string[]
}>()

const emit = defineEmits<{
  change: [event: Event]
  input: [event: Event]
}>()
</script>
