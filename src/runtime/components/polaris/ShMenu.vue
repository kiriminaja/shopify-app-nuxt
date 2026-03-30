<template>
  <s-menu v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-menu>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShMenu', inheritAttrs: false })

defineProps<{
  accessibilityLabel?: string
}>()
</script>
