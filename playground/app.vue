<template>
  <s-page title="Edit Product">
    <div>
      <s-heading>Shopify Nuxt Playground</s-heading>
      <s-paragraph>This app is loaded inside the Shopify Admin.</s-paragraph>
    </div>
    <button variant="primary" @click="test">Save</button>
    <button>Discard</button>

    <s-app-nav>
      <s-link href="/" rel="home">Home</s-link>
      <s-link href="/templates">Templates</s-link>
      <s-link href="/settings">Settings</s-link>
    </s-app-nav>
  </s-page>
</template>

<script setup lang="ts">
const shopify = useAppBridge()

const test = () => {
  console.info(
    'TOAST TRIGGERED',
    shopify?.toast.show('Hello from the playground app!')
  )
}
</script>
