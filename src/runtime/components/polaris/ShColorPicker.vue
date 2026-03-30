<template>
  <s-color-picker
    v-bind="$attrs"
    @change="emit('change', $event)"
    @input="emit('input', $event)"
  >
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

const emit = defineEmits<{
  change: [event: Event]
  input: [event: Event]
}>()
</script>
