// server/plugins/shopify.ts
import { configureShopify } from '#shopify/server'
import { MemorySessionStorage } from '@shopify/shopify-app-session-storage-memory'

export default defineNitroPlugin(() => {
  configureShopify({
    sessionStorage: new MemorySessionStorage(),
    hooks: {
      afterAuth: async ({ session: _session, admin: _admin }) => {
        // Register webhooks, seed data, etc.
      }
    }
  })
})
