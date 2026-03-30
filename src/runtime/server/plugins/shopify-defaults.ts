import { defineNitroPlugin } from 'nitropack/runtime'
import { MemorySessionStorage } from '@shopify/shopify-app-session-storage-memory'
import { configureShopify, getResolvedConfig } from '../services/shopify'

/**
 * Built-in Nitro plugin that initializes Shopify with default MemorySessionStorage.
 *
 * If the user calls `configureShopify()` in their own server plugin,
 * it will override these defaults (configureShopify resets cached singletons).
 */
export default defineNitroPlugin(() => {
  // Only set defaults if configureShopify() hasn't been called yet
  try {
    const config = getResolvedConfig()
    if (config.sessionStorage) return
  } catch {
    // getResolvedConfig might fail if called too early — that's fine, set defaults
  }

  configureShopify({
    sessionStorage: new MemorySessionStorage()
  })
})
