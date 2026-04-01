<template>
  <s-button-group v-bind="polarisAttrs">
    <slot />
  </s-button-group>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  gap?: 'base' | 'none'
  accessibilityLabel?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
