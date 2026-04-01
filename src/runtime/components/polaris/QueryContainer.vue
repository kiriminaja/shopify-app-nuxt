<template>
  <s-query-container v-bind="polarisAttrs">
    <slot />
  </s-query-container>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  containerName?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
