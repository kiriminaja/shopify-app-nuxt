import {
  defineNuxtModule,
  addPlugin,
  addServerHandler,
  addImportsDir,
  addComponentsDir,
  createResolver,
  addServerImportsDir,
  addRouteMiddleware,
  addTypeTemplate
} from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { ModuleOptions } from './runtime/types'
import { ApiVersion } from '@shopify/shopify-api'

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
    apiVersion: ApiVersion.January26,
    authPathPrefix: '/_shopify/auth',
    distribution: 'app_store' as any,
    useOnlineTokens: false
  },
  setup(options, nuxt: Nuxt) {
    const resolver = createResolver(import.meta.url)

    // ─── Runtime Config ────────────────────────────────────────────────
    // Private server-side config (secrets — not exposed to client)
    nuxt.options.runtimeConfig.shopify = {
      apiKey: options.apiKey,
      apiSecretKey: options.apiSecretKey,
      scopes: options.scopes,
      appUrl: options.appUrl,
      apiVersion: options.apiVersion || ApiVersion.January26,
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
    // Auto-register Vue components (ShopifyAppProvider, ShopifyAppProxyProvider, Sh* polaris wrappers)
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      pathPrefix: false
    })

    // ─── App Bridge Head Tags (SSR) ─────────────────────────────────
    // Inject meta tag and CDN script during SSR so they appear in the initial HTML.
    // The meta tag MUST appear before the App Bridge script — it reads the API key on load.
    nuxt.hook('app:resolve', () => {
      nuxt.options.app.head = nuxt.options.app.head || {}
      nuxt.options.app.head.meta = [
        {
          name: 'content-security-policy',
          content: "frame-ancestors 'self' *.myshopify.com *.shopify.com"
        },
        ...(nuxt.options.app.head.meta || [])
      ]
      nuxt.options.app.head.script = [
        // 1. Inline script to create the meta tag imperatively — guarantees it
        //    exists in the DOM before the CDN script executes.
        {
          key: 'shopify-api-key-meta',
          innerHTML: `var m=document.createElement('meta');m.name='shopify-api-key';m.content='${options.apiKey}';document.head.appendChild(m);`,
          tagPosition: 'head'
        },
        // 2. App Bridge CDN — reads the meta tag on load
        {
          src: 'https://cdn.shopify.com/shopifycloud/app-bridge.js',
          tagPosition: 'head'
        },
        // 3. Polaris CDN
        {
          src: 'https://cdn.shopify.com/shopifycloud/polaris.js',
          tagPosition: 'head'
        },
        ...(nuxt.options.app.head.script || [])
      ]
      nuxt.options.vue.compilerOptions.isCustomElement = (tag) => {
        // Match all Shopify Polaris web component tags (s-*)
        return tag.startsWith('s-')
      }
    })

    // 3. Inject the type declarations into the Nuxt TS environment
    addTypeTemplate({
      filename: 'types/polaris.d.ts',
      getContents: () => `
/// <reference types="@shopify/polaris-types" />

declare module 'vue' {
  interface HTMLAttributes {
    slot?: string
  }
}

export {}
`
    })

    // ─── Client Plugin ─────────────────────────────────────────────────
    // App Bridge npm package initialization (client-side only)
    addPlugin({
      src: resolver.resolve('./runtime/plugins/app-bridge'),
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

    addRouteMiddleware({
      name: 'shopify-auth',
      path: resolver.resolve('./runtime/middleware/shopify-auth'),
      global: false
    })

    // ─── Transpile ─────────────────────────────────────────────────────
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    // Ensure @shopify/shopify-api adapter side-effects are preserved in the Nitro bundle
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.externals = nitroConfig.externals || {}
      nitroConfig.externals.inline = nitroConfig.externals.inline || []
      ;(nitroConfig.externals.inline as string[]).push(
        '@shopify/shopify-api',
        '@shopify/shopify-api/adapters/node'
      )
    })

    // ─── Type Declarations ─────────────────────────────────────────────
    nuxt.hook('prepare:types', ({ references }) => {
      references.push({
        path: resolver.resolve('./runtime/types.ts')
      })
    })
  }
})
