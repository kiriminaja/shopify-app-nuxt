<template>
  <s-text v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-text>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShText', inheritAttrs: false })

defineProps<{
  fontVariantNumeric?: 'auto' | 'normal' | 'tabular-nums'
  color?: 'base' | 'subdued'
  tone?:
    | 'info'
    | 'success'
    | 'warning'
    | 'critical'
    | 'auto'
    | 'neutral'
    | 'caution'
  type?: 'strong' | 'generic' | 'address' | 'redundant'
  dir?: '' | 'auto' | 'ltr' | 'rtl'
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive'
  interestFor?: string
}>()
</script>
