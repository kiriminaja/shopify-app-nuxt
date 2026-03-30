<template>
  <s-table-cell v-bind="$attrs">
    <slot />
  </s-table-cell>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTableCell', inheritAttrs: false })
</script>
