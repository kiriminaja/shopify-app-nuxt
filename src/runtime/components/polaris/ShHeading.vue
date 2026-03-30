<template>
  <s-heading v-bind="$attrs">
    <slot />
  </s-heading>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShHeading', inheritAttrs: false })

defineProps<{
  accessibilityRole?: 'none' | 'presentation' | 'heading'
  lineClamp?: number
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive'
}>()
</script>
