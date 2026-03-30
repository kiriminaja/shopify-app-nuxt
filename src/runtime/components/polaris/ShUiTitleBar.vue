<template>
  <ui-title-bar v-bind="polarisAttrs">
    <slot />
  </ui-title-bar>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

defineOptions({ name: 'ShUiTitleBar', inheritAttrs: false })

const props = defineProps<{
  title?: string
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
