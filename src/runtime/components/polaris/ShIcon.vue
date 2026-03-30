<template>
  <s-icon v-bind="$attrs">
    <slot />
  </s-icon>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShIcon', inheritAttrs: false })

defineProps<{
  color?: 'base' | 'subdued'
  tone?:
    | 'info'
    | 'success'
    | 'warning'
    | 'critical'
    | 'auto'
    | 'neutral'
    | 'caution'
  type?: string
  size?: 'small' | 'base'
  interestFor?: string
}>()
</script>
