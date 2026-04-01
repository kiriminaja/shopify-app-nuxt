<template>
  <s-heading v-bind="polarisAttrs">
    <slot />
  </s-heading>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShHeading', inheritAttrs: false })

const props = defineProps<{
  accessibilityRole?: 'none' | 'presentation' | 'heading'
  lineClamp?: number
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
