<template>
  <ShPage heading="App Playground Product">
    <ShLink slot="breadcrumb-actions" href="/">Home</ShLink>
    <ShButton
      slot="primary-action"
      variant="primary"
      command-for="example-modal"
      command="--show"
    >
      Show Modal
    </ShButton>
    <form data-save-bar @submit.prevent="test()">
      <ShStack gap="base">
        <div>
          <ShHeading>Shopify Nuxt Playground</ShHeading>
          <ShParagraph>
            This app is loaded inside the Shopify Admin.
          </ShParagraph>
        </div>
        <ShTextField
          v-model="example"
          label="Product title"
          placeholder="Try write text-field"
          required
        />
        <ShButton type="submit" variant="primary" @click="test">
          Save
        </ShButton>
        <span>Typed: {{ example || '-' }}</span>
        <ShBanner v-if="shop" heading="Shop info" tone="info">
          <ShParagraph>
            {{ shop.shop.name }} ({{ shop.shop.currencyCode }})
          </ShParagraph>
        </ShBanner>
      </ShStack>
    </form>
    <ShModal id="example-modal" heading="Example Modal">
      <ShParagraph>This is a Polaris modal.</ShParagraph>
      <ShButton
        slot="primary-action"
        variant="primary"
        command-for="example-modal"
        command="--hide"
      >
        Close
      </ShButton>
    </ShModal>
  </ShPage>
</template>

<script setup lang="ts">
const shopify = useAppBridge()

const { data: shopData } = await useAsyncData(
  'shop',
  () => useShopifyFetch('/api/shop'),
  { server: false }
)

const shop = computed(() => shopData.value?.data)

const test = () => {
  console.info(
    'TOAST TRIGGERED',
    shopify?.toast.show('Hello from the playground app!')
  )
}

const example = ref('')

definePageMeta({
  middleware: 'shopify-auth',
  layout: 'auth'
})
</script>
