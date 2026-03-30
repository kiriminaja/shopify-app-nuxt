<template>
  <s-page v-bind="polarisAttrs">
    <slot />
  </s-page>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShPage', inheritAttrs: false })

const props = defineProps<{
  inlineSize?: 'small' | 'base' | 'large'
  heading?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
