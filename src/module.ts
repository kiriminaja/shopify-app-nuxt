import {
  defineNuxtModule,
  addPlugin,
  addServerHandler,
  addImportsDir,
  addComponentsDir,
  createResolver,
  addServerImportsDir
} from '@nuxt/kit'
import type { ModuleOptions } from './runtime/types'

export type { ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'shopify-nuxt',
    configKey: 'shopify'
  },
  defaults: {
    apiKey: '',
    apiSecretKey: '',
    scopes: [],
    appUrl: '',
    apiVersion: '2025-01',
    authPathPrefix: '/_shopify/auth',
    distribution: 'app_store' as any,
    useOnlineTokens: false
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // ─── Runtime Config ────────────────────────────────────────────────
    // Private server-side config (secrets — not exposed to client)
    nuxt.options.runtimeConfig.shopify = {
      apiKey: options.apiKey,
      apiSecretKey: options.apiSecretKey,
      scopes: options.scopes,
      appUrl: options.appUrl,
      apiVersion: options.apiVersion || '2025-01',
      authPathPrefix: options.authPathPrefix || '/_shopify/auth',
      distribution: options.distribution || 'app_store',
      useOnlineTokens: options.useOnlineTokens || false
    } as any

    // Public config (safe to expose to client — only the API key)
    nuxt.options.runtimeConfig.public.shopify = {
      apiKey: options.apiKey
    } as any

    // ─── Aliases ───────────────────────────────────────────────────────
    // Allow importing from '#shopify/server' in server code
    nuxt.options.alias['#shopify/server'] = resolver.resolve('./runtime/server')

    // ─── Server Auto-Imports ───────────────────────────────────────────
    // Auto-import server utilities (useShopifyAdmin, useShopifyWebhook, etc.)
    addServerImportsDir(resolver.resolve('./runtime/server/utils'))

    // ─── Client Auto-Imports ───────────────────────────────────────────
    // Auto-import composables (useAppBridge, useShopifyFetch)
    addImportsDir(resolver.resolve('./runtime/composables'))

    // ─── Components ────────────────────────────────────────────────────
    // Auto-register Vue components (ShopifyAppProvider, ShopifyAppProxyProvider)
    addComponentsDir({
      path: resolver.resolve('./runtime/components')
    })

    // ─── Client Plugin ─────────────────────────────────────────────────
    // App Bridge initialization (client-side only)
    addPlugin({
      src: resolver.resolve('./runtime/plugins/app-bridge.client'),
      mode: 'client'
    })

    // ─── Server Routes ─────────────────────────────────────────────────
    const authPrefix = options.authPathPrefix || '/_shopify/auth'

    // OAuth start
    addServerHandler({
      route: authPrefix,
      method: 'get',
      handler: resolver.resolve('./runtime/server/routes/auth')
    })

    // OAuth callback
    addServerHandler({
      route: `${authPrefix}/callback`,
      method: 'get',
      handler: resolver.resolve('./runtime/server/routes/auth-callback')
    })

    // Exit iframe page
    addServerHandler({
      route: `${authPrefix}/exit-iframe`,
      method: 'get',
      handler: resolver.resolve('./runtime/server/routes/auth-exit-iframe')
    })

    // Session token bounce page
    addServerHandler({
      route: `${authPrefix}/session-token`,
      method: 'get',
      handler: resolver.resolve('./runtime/server/routes/auth-session-token')
    })

    // ─── Server Middleware ─────────────────────────────────────────────
    // CSP headers for embedded apps
    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/shopify-csp'),
      middleware: true
    })

    // ─── Transpile ─────────────────────────────────────────────────────
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    // ─── Type Declarations ─────────────────────────────────────────────
    nuxt.hook('prepare:types', ({ references }) => {
      references.push({
        path: resolver.resolve('./runtime/types.ts')
      })
    })
  }
})
