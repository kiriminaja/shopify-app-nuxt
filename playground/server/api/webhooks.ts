export default defineEventHandler(async (event) => {
  // Example: handle incoming webhooks from Shopify
  const { topic, shop, payload } = await useShopifyWebhook(event)

  console.log(`Received webhook: ${topic} from ${shop}`)

  switch (topic) {
    case 'APP_UNINSTALLED':
      // Clean up shop data
      console.log(`App uninstalled from ${shop}`)
      break
    case 'PRODUCTS_CREATE':
      // Handle new product
      console.log('New product:', payload.title)
      break
  }

  return { success: true }
})
