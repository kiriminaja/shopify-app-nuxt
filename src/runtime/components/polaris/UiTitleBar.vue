<template>
  <ui-title-bar v-bind="polarisAttrs">
    <button
      v-if="primaryAction"
      variant="primary"
      :disabled="primaryAction.disabled || undefined"
      @click="primaryAction.onClick"
    >
      {{ primaryAction.label }}
    </button>
    <button
      v-if="breadcrumb"
      variant="breadcrumb"
      @click="breadcrumb.onClick"
    >
      {{ breadcrumb.label }}
    </button>
    <button
      v-for="(action, i) in actions"
      :key="i"
      :disabled="action.disabled || undefined"
      @click="action.onClick"
    >
      {{ action.label }}
    </button>
  </ui-title-bar>
</template>

<script setup lang="ts">
import { usePolarisAttrs } from './utils'

export interface TitleBarAction {
  label: string
  disabled?: boolean
  onClick: () => void
}

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  title?: string
  primaryAction?: TitleBarAction
  breadcrumb?: Omit<TitleBarAction, 'disabled'>
  actions?: TitleBarAction[]
}>()

const polarisAttrs = usePolarisAttrs(props, ['primaryAction', 'breadcrumb', 'actions'])
</script>
