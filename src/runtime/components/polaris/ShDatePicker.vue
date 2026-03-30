<template>
  <s-date-picker v-bind="$attrs" @blur="emit('blur', $event)" @change="emit('change', $event)" @focus="emit('focus', $event)" @input="emit('input', $event)" @viewchange="emit('viewchange', $event)">
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

const emit = defineEmits<{
  blur: [event: Event]
  change: [event: Event]
  focus: [event: Event]
  input: [event: Event]
  viewchange: [event: Event]
}>()
</script>
