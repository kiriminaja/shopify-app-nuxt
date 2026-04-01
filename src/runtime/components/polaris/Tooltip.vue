<template>
  <s-tooltip v-bind="polarisAttrs">
    <slot />
  </s-tooltip>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  id: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
