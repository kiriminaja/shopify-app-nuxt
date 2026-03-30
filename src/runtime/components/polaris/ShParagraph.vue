<template>
  <s-paragraph v-bind="$attrs">
    <slot />
  </s-paragraph>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShParagraph', inheritAttrs: false })

defineProps<{
  fontVariantNumeric?: 'auto' | 'normal' | 'tabular-nums'
  lineClamp?: number
  tone?: 'info' | 'success' | 'warning' | 'critical' | 'caution' | 'auto'
  color?: 'base' | 'subdued'
  dir?: '' | 'auto' | 'ltr' | 'rtl'
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive'
}>()
</script>
