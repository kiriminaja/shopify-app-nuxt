export default defineEventHandler(async (event) => {
  const { admin } = await useShopifyAdmin(event)
  const response = await admin.graphql(`{ shop { name currencyCode } }`)
  const { data } = await response.json()
  return data
})
