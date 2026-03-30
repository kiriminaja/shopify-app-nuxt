<template>
  <s-table-row v-bind="$attrs">
    <slot />
  </s-table-row>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTableRow', inheritAttrs: false })

defineProps<{
  clickDelegate?: string
}>()
</script>
