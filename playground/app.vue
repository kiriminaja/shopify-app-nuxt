<template>
  <ShPage heading="App Playground Product">
    <ShButton slot="primary-action" variant="primary">Primary</ShButton>
    <div>
      <ShHeading>Shopify Nuxt Playground</ShHeading>
      <ShParagraph>This app is loaded inside the Shopify Admin.</ShParagraph>
    </div>
    <ShButton variant="primary" @click="test">Save</ShButton>
    <ShButton>Discard</ShButton>

    <ShAppNav>
      <ShLink href="/" rel="home">Home</ShLink>
      <ShLink href="/templates">Templates</ShLink>
      <ShLink href="/settings">Settings</ShLink>
    </ShAppNav>
  </ShPage>
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
