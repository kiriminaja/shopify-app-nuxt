<template>
  <s-link v-bind="polarisAttrs">
    <slot />
  </s-link>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
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

const polarisAttrs = usePolarisAttrs(props)
</script>
