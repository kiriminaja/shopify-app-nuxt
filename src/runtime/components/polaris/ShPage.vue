<template>
  <s-page v-bind="$attrs" :inline-size="inlineSize" :heading="heading">
    <slot />
  </s-page>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShPage', inheritAttrs: false })

const { inlineSize, heading } = defineProps<{
  inlineSize?: 'small' | 'base' | 'large'
  heading?: string
}>()
</script>
