<template>
  <s-table-header-row v-bind="$attrs">
    <slot />
  </s-table-header-row>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTableHeaderRow', inheritAttrs: false })
</script>
