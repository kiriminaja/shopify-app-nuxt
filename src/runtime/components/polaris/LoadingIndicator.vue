<script setup lang="ts">
import { useLoadingIndicator, useAppBridge } from '#imports'
import { watch, onBeforeUnmount } from 'vue'

const { isLoading } = useLoadingIndicator()
const shopify = useAppBridge()

watch(
  isLoading,
  (loading) => {
    shopify.loading(loading)
  },
  {
    immediate: true
  }
)

onBeforeUnmount(() => {
  shopify.loading(false)
})
</script>

<template>
  <slot />
</template>
