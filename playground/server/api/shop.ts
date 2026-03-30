export default defineEventHandler(async (event) => {
  const { admin } = await useShopifyAdmin(event)
  const response = await admin.graphql(`{ shop { name currencyCode } }`)
  return response.data
})
