<template>
  <s-paragraph v-bind="polarisAttrs">
    <slot />
  </s-paragraph>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  fontVariantNumeric?: 'auto' | 'normal' | 'tabular-nums'
  lineClamp?: number
  tone?: 'info' | 'success' | 'warning' | 'critical' | 'caution' | 'auto'
  color?: 'base' | 'subdued'
  dir?: '' | 'auto' | 'ltr' | 'rtl'
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
