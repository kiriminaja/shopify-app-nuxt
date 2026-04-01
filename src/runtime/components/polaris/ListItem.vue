<template>
  <s-list-item v-bind="$attrs">
    <slot />
  </s-list-item>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>
