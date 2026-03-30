<template>
  <s-divider v-bind="$attrs">
    <slot />
  </s-divider>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShDivider', inheritAttrs: false })

defineProps<{
  direction?: 'inline' | 'block'
  color?: 'base' | 'strong'
}>()
</script>
