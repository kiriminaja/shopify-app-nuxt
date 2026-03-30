<template>
  <s-menu v-bind="$attrs">
    <slot />
  </s-menu>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShMenu', inheritAttrs: false })

defineProps<{
  accessibilityLabel?: string
}>()
</script>
