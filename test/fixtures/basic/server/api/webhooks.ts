export default defineEventHandler(async (event) => {
  const { topic, shop, payload } = await useShopifyWebhook(event)
  return { success: true, topic, shop }
})
