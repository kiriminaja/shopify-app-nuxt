<template>
  <s-table v-bind="{ ...$attrs, ...$props }">
    <slot />
  </s-table>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShTable', inheritAttrs: false })

defineProps<{
  variant?: 'auto' | 'list'
  loading?: boolean
  paginate?: boolean
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}>()
</script>
