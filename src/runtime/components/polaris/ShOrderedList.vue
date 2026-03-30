<template>
  <s-ordered-list v-bind="$attrs">
    <slot />
  </s-ordered-list>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShOrderedList', inheritAttrs: false })
</script>
