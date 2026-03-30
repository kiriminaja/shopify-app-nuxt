<template>
  <s-unordered-list v-bind="$attrs">
    <slot />
  </s-unordered-list>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShUnorderedList', inheritAttrs: false })
</script>
