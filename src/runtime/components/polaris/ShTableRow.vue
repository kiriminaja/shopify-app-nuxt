<template>
  <s-table-row v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-table-row>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTableRow', inheritAttrs: false })

defineProps<{
  clickDelegate?: string
}>()
</script>
