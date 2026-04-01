<template>
  <s-button
    v-bind="polarisAttrs"
    @click="emit('click', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <slot />
  </s-button>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShButton', inheritAttrs: false })

const props = defineProps<{
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

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'focus' | 'blur', event: FocusEvent): void
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
