<template>
  <s-menu v-bind="polarisAttrs">
    <slot />
  </s-menu>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShMenu', inheritAttrs: false })

const props = defineProps<{
  accessibilityLabel?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
