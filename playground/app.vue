<template>
  <ShPage heading="App Playground Product">
    <ShButton slot="primary-action" variant="primary">Primary</ShButton>
    <div>
      <ShHeading>Shopify Nuxt Playground</ShHeading>
      <ShParagraph>This app is loaded inside the Shopify Admin.</ShParagraph>
    </div>
    <form data-save-bar>
      <ShStack gap="base">
        <ShTextField v-model="example" label="Product title" required />
        <ShButtonGroup>
          <ShButton variant="primary" slot="primary-action" @click="test">
            Save
          </ShButton>
          <ShButton slot="secondary-actions">Discard</ShButton>
        </ShButtonGroup>
      </ShStack>
      <span>Typed: {{ example }}</span>
    </form>

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

const example = ref('')
</script>
