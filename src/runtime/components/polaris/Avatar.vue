<template>
  <s-avatar v-bind="polarisAttrs">
    <slot />
  </s-avatar>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShAvatar', inheritAttrs: false })

const props = defineProps<{
  initials?: string
  src?: string
  size?: 'small' | 'small-200' | 'base' | 'large' | 'large-200'
  alt?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
