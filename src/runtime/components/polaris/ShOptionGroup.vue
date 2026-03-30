<template>
  <s-option-group v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-option-group>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShOptionGroup', inheritAttrs: false })

defineProps<{
  disabled?: boolean
  label?: string
}>()
</script>
