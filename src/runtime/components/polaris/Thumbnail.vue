<template>
  <s-thumbnail v-bind="polarisAttrs">
    <slot />
  </s-thumbnail>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShThumbnail', inheritAttrs: false })

const props = defineProps<{
  src?: string
  alt?: string
  size?: 'small' | 'small-100' | 'small-200' | 'base' | 'large' | 'large-100'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
