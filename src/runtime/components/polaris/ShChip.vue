<template>
  <s-chip v-bind="$attrs">
    <slot />
  </s-chip>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShChip', inheritAttrs: false })

defineProps<{
  color?: string
  accessibilityLabel?: string
}>()
</script>
