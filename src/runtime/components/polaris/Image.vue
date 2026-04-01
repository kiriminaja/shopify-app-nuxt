<template>
  <s-image v-bind="polarisAttrs">
    <slot />
  </s-image>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  id?: string
  originalSrc?: string
  altText?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
