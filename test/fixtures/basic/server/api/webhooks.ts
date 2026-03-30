export default defineEventHandler(async (event) => {
  const { topic, shop, _payload } = await useShopifyWebhook(event)
  return { success: true, topic, shop }
})
