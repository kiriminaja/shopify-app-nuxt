import { nodeAdapterInitialized } from '@shopify/shopify-api/adapters/node'
import { shopifyApi, type Shopify } from '@shopify/shopify-api'
import type { SessionStorage } from '@shopify/shopify-app-session-storage'
import { useRuntimeConfig } from '#imports'
import type {
  ShopifyRuntimeConfig,
  ResolvedConfig,
  AuthConfig
} from '../../types'
import { AppDistribution } from '../../types'

// Ensure the adapter is not tree-shaken by referencing the export
if (!nodeAdapterInitialized) {
  throw new Error('Shopify Node adapter failed to initialize')
}

let _shopifyApi: Shopify | null = null
let _resolvedConfig: ResolvedConfig | null = null
let _runtimeConfig: ShopifyRuntimeConfig | null = null

const LIBRARY_VERSION = '1.0.0'

/**
 * Configure Shopify with runtime options that can't be serialized in nuxt.config.ts.
 *
 * Call this in a Nitro plugin (`server/plugins/shopify.ts`):
 *
 * ```ts
 * import { configureShopify } from '#shopify/server'
 *
 * export default defineNitroPlugin(() => {
 *   configureShopify({
 *     sessionStorage: new PrismaSessionStorage(prisma),
 *     hooks: {
 *       afterAuth: async ({ session }) => {
 *         // seed store data
 *       }
 *     }
 *   })
 * })
 * ```
 */
export function configureShopify(config: ShopifyRuntimeConfig): void {
  _runtimeConfig = { ..._runtimeConfig, ...config }
  // Reset cached instances so they'll be re-created with new config
  _shopifyApi = null
  _resolvedConfig = null
}

/**
 * Get the initialized Shopify API instance.
 * Lazily creates it on first access using module options + runtime config.
 */
export function getShopifyApi(): Shopify {
  if (_shopifyApi) return _shopifyApi

  const resolved = getResolvedConfig()

  let appUrl: URL
  try {
    appUrl = new URL(resolved.appUrl)
  } catch {
    throw new Error(
      resolved.appUrl === ''
        ? 'Detected an empty appUrl configuration. Set NUXT_SHOPIFY_APP_URL or configure shopify.appUrl in nuxt.config.ts.'
        : `Invalid appUrl configuration '${resolved.appUrl}'. Please provide a valid URL.`
    )
  }

  const userAgentPrefix = `Shopify Nuxt Module v${LIBRARY_VERSION}`

  _shopifyApi = shopifyApi({
    apiKey: resolved.apiKey,
    apiSecretKey: resolved.apiSecretKey,
    scopes: resolved.scopes,
    hostName: appUrl.host,
    hostScheme: appUrl.protocol.replace(':', '') as 'http' | 'https',
    apiVersion: resolved.apiVersion as any,
    isEmbeddedApp: true,
    isCustomStoreApp: resolved.distribution === AppDistribution.ShopifyAdmin,
    userAgentPrefix,
    billing: resolved.billing,
    future: {
      unstable_managedPricingSupport: true
    }
  } as any)

  // Register webhook handlers if configured
  if (resolved.webhooks) {
    _shopifyApi.webhooks.addHandlers(resolved.webhooks)
  }

  return _shopifyApi
}

/**
 * Get the fully resolved configuration (module options + runtime config merged).
 */
export function getResolvedConfig(): ResolvedConfig {
  if (_resolvedConfig) return _resolvedConfig

  const nuxtConfig = useRuntimeConfig()
  const moduleOpts = (nuxtConfig as any).shopify || {}
  const runtime = _runtimeConfig || {}

  const authPathPrefix = moduleOpts.authPathPrefix || '/_shopify/auth'
  const auth: AuthConfig = {
    path: authPathPrefix,
    callbackPath: `${authPathPrefix}/callback`,
    exitIframePath: `${authPathPrefix}/exit-iframe`,
    patchSessionTokenPath: `${authPathPrefix}/session-token`,
    loginPath: `${authPathPrefix}/login`
  }

  _resolvedConfig = {
    apiKey: moduleOpts.apiKey || '',
    apiSecretKey: moduleOpts.apiSecretKey || '',
    scopes: moduleOpts.scopes,
    appUrl: moduleOpts.appUrl || '',
    apiVersion: moduleOpts.apiVersion || '2025-01',
    authPathPrefix,
    distribution:
      (moduleOpts.distribution as AppDistribution) || AppDistribution.AppStore,
    useOnlineTokens: moduleOpts.useOnlineTokens ?? false,
    auth,
    sessionStorage: runtime.sessionStorage,
    webhooks: runtime.webhooks,
    hooks: runtime.hooks || {},
    billing: runtime.billing
  }

  return _resolvedConfig
}

/**
 * Get the session storage instance.
 * Throws if not configured and not a ShopifyAdmin app.
 */
export function getSessionStorage(): SessionStorage {
  const config = getResolvedConfig()
  if (!config.sessionStorage) {
    if (config.distribution !== AppDistribution.ShopifyAdmin) {
      throw new Error(
        'No session storage configured. Call configureShopify({ sessionStorage: ... }) in a server plugin. ' +
          'See https://github.com/Shopify/shopify-app-js#session-storage-options for options.'
      )
    }
  }
  return config.sessionStorage!
}
