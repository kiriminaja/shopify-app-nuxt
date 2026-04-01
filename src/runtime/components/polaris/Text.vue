<template>
  <s-text v-bind="polarisAttrs">
    <slot />
  </s-text>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
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

const polarisAttrs = usePolarisAttrs(props)
</script>
