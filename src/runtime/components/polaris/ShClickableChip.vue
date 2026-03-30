<template>
  <s-clickable-chip v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-clickable-chip>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShClickableChip', inheritAttrs: false })

defineProps<{
  color?: string
  accessibilityLabel?: string
  removable?: boolean
  hidden?: boolean
  disabled?: boolean
  href?: string
  command?: '--auto' | '--show' | '--hide' | '--toggle'
  commandFor?: string
  interestFor?: string
}>()
</script>
