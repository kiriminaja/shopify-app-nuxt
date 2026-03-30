<template>
  <s-table-body v-bind="$attrs">
    <slot />
  </s-table-body>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTableBody', inheritAttrs: false })
</script>
