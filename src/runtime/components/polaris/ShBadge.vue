<template>
  <s-badge v-bind="polarisAttrs">
    <slot />
  </s-badge>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShBadge', inheritAttrs: false })

const props = defineProps<{
  content?: string
  progress?: string
  tone?: string
  icon?: string
  size?: 'base' | 'large'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
