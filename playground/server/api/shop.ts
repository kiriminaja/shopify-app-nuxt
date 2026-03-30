interface ShopData {
  shop: {
    name: string
    currencyCode: string
  }
}

export default defineEventHandler(async (event) => {
  const { admin } = await useShopifyAdmin(event)
  const response = await admin.graphql(`{ shop { name currencyCode } }`)
  const { data } = (await response.json()) as { data: ShopData }
  return data
})
