// server/plugins/shopify.ts
// Session storage is provided by the module (MemorySessionStorage by default).
// Use configureShopify() only when you need to customize hooks, billing, or storage.
import { configureShopify } from '#shopify/server'

export default defineNitroPlugin(() => {
  configureShopify({
    hooks: {
      afterAuth: async ({ session: _session, admin: _admin }) => {
        // Register webhooks, seed data, etc.
      }
    }
  })
})
