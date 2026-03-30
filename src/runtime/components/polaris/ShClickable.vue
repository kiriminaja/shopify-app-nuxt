<template>
  <s-clickable v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-clickable>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShClickable', inheritAttrs: false })

defineProps<{
  disabled?: boolean
  loading?: boolean
  target?: 'auto' | '_blank' | '_self' | '_parent' | '_top' | (string & {})
  href?: string
  download?: string
  type?: 'button' | 'reset' | 'submit'
  accessibilityRole?: string
  background?: string
  blockSize?: string
  minBlockSize?: string
  maxBlockSize?: string
  inlineSize?: string
  minInlineSize?: string
  maxInlineSize?: string
  overflow?: 'visible' | 'hidden'
  padding?: string
  paddingBlock?: string
  paddingBlockStart?: string
  paddingBlockEnd?: string
  paddingInline?: string
  paddingInlineStart?: string
  paddingInlineEnd?: string
  border?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  borderRadius?: string
  accessibilityLabel?: string
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive'
  display?: string
  command?: '--auto' | '--show' | '--hide' | '--toggle'
  commandFor?: string
  interestFor?: string
}>()
</script>
