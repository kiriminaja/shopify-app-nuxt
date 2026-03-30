<template>
  <s-table-header v-bind="$attrs">
    <slot />
  </s-table-header>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTableHeader', inheritAttrs: false })

defineProps<{
  listSlot?: string
  format?: string
}>()
</script>
