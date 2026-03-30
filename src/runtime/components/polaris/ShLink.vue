<template>
  <s-link v-bind="$attrs">
    <slot />
  </s-link>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShLink', inheritAttrs: false })

defineProps<{
  tone?: 'auto' | 'critical' | 'neutral'
  accessibilityLabel?: string
  href?: string
  target?: 'auto' | '_blank' | '_self' | '_parent' | '_top' | (string & {})
  download?: string
  lang?: string
  command?: '--auto' | '--show' | '--hide' | '--toggle'
  commandFor?: string
  interestFor?: string
}>()
</script>
