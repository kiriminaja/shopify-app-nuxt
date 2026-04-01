<template>
  <s-divider v-bind="polarisAttrs">
    <slot />
  </s-divider>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  direction?: 'inline' | 'block'
  color?: 'base' | 'strong'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
