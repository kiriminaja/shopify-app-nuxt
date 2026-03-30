<script setup lang="ts">
const router = useRouter()
const shopify = useAppBridge()

// trigger shopify.loading when router changed
router.beforeEach(() => {
  shopify.loading(true)
})
</script>

<template>
  <NuxtPage />
  <ShAppNav>
    <ShLink href="/" rel="home">Home</ShLink>
    <ShLink href="/products">Products</ShLink>
    <ShLink href="/settings">Settings</ShLink>
  </ShAppNav>
</template>
