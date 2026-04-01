<template>
  <s-clickable-chip v-bind="polarisAttrs">
    <slot />
  </s-clickable-chip>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  color?: string
  accessibilityLabel?: string
  removable?: boolean
  hidden?: boolean
  disabled?: boolean
  href?: string
  command?: '--auto' | '--show' | '--hide' | '--toggle'
  commandFor?: string
  interestFor?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
