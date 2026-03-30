<template>
  <s-tooltip v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-tooltip>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTooltip', inheritAttrs: false })

defineProps<{
  id: string
}>()
</script>
