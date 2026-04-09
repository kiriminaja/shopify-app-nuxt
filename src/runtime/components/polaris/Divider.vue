<template>
  <s-divider v-bind="polarisAttrs">
    <slot />
  </s-divider>
</template>

<script setup lang="ts">
import type { MaybeResponsive } from '../../types'
import { usePolarisAttrs } from './utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  direction?: MaybeResponsive<'block' | 'inline'>
  color?: 'base' | 'strong'
}>()

const polarisAttrs = usePolarisAttrs(props)
</script>
