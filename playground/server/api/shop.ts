interface ShopData {
  shop: {
    name: string
    currencyCode: string
  }
}

export default defineEventHandler(async (event) => {
  const { admin } = await useShopifyAdmin(event)
  const { data } = await admin.graphql<{
    data: ShopData
  }>(`#graphql { shop { name currencyCode } }`)

  return data
})
