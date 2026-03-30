<template>
  <s-avatar v-bind="$attrs">
    <slot />
  </s-avatar>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShAvatar', inheritAttrs: false })

defineProps<{
  initials?: string
  src?: string
  size?: 'small' | 'small-200' | 'base' | 'large' | 'large-200'
  alt?: string
}>()
</script>
