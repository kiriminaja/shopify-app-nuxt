<template>
  <s-banner v-bind="polarisAttrs">
    <slot />
  </s-banner>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  heading?: string
  tone?: 'info' | 'success' | 'warning' | 'critical' | 'auto'
  hidden?: boolean
  dismissible?: boolean
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
