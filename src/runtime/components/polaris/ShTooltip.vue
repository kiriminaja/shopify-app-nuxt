<template>
  <s-tooltip v-bind="$attrs">
    <slot />
  </s-tooltip>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTooltip', inheritAttrs: false })
</script>
