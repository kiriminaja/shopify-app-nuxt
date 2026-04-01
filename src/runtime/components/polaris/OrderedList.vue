<template>
  <s-ordered-list v-bind="$attrs">
    <slot />
  </s-ordered-list>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>
