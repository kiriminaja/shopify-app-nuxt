// Test endpoint: echoes back the Authorization header received,
// used to verify that useShopifyFetch forwards auth headers server-side.
export default defineEventHandler((event) => {
  return {
    authorization: getHeader(event, 'authorization') ?? null
  }
})
