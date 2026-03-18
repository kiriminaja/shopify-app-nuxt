export default defineEventHandler(async (event) => {
  // Example: authenticate an admin request and query the shop
  const { admin } = await useShopifyAdmin(event)
  const response = await admin.graphql(`{ shop { name currencyCode } }`)
  return response
})
