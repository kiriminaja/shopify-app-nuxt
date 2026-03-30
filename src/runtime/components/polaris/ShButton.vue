<template>
  <s-button v-bind="$attrs">
    <slot />
  </s-button>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShButton', inheritAttrs: false })

defineProps<{
  disabled?: boolean
  icon?: string
  loading?: boolean
  variant?: 'auto' | 'primary' | 'secondary' | 'tertiary'
  tone?: 'auto' | 'critical' | 'neutral'
  target?: 'auto' | '_blank' | '_self' | '_parent' | '_top' | (string & {})
  href?: string
  download?: string
  type?: 'button' | 'reset' | 'submit'
  accessibilityLabel?: string
  command?: '--auto' | '--show' | '--hide' | '--toggle'
  commandFor?: string
  interestFor?: string
}>()
</script>
