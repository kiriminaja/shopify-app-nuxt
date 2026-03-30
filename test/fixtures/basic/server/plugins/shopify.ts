import { configureShopify } from '#shopify/server'
import { MemorySessionStorage } from '@shopify/shopify-app-session-storage-memory'

export default defineNitroPlugin(() => {
  configureShopify({
    sessionStorage: new MemorySessionStorage()
  })
})
