import {
  defineNuxtModule,
  addPlugin,
  addServerHandler,
  addImportsDir,
  createResolver,
  addServerImportsDir,
  addRouteMiddleware,
  extendPages,
  addServerPlugin,
  useNitro,
  useLogger
} from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import {
  AppDistribution,
  type ModuleOptions,
  type PolarisIcon
} from './runtime/types'
import { ApiVersion } from '@shopify/shopify-api'

export type { ModuleOptions, PolarisIcon }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'shopify-app-nuxt',
    configKey: 'shopify'
  },
  defaults: {
    apiKey: '',
    apiSecretKey: '',
    appUrl: '',
    apiVersion: ApiVersion.January26,
    authPathPrefix: '/_shopify/auth',
    distribution: AppDistribution.AppStore,
    useOnlineTokens: false,
    componentPrefix: 'Sh'
  },
  setup(options, nuxt: Nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('shopify-app-nuxt:module')

    // ─── Runtime Config ────────────────────────────────────────────────
    // Private server-side config (secrets — not exposed to client)
    nuxt.options.runtimeConfig.shopify = {
      apiKey: options.apiKey,
      apiSecretKey: options.apiSecretKey,
      scopes: options.scopes || [],
      appUrl: options.appUrl,
      apiVersion: options.apiVersion || ApiVersion.January26,
      authPathPrefix: options.authPathPrefix || '/_shopify/auth',
      distribution: options.distribution || AppDistribution.AppStore,
      useOnlineTokens: options.useOnlineTokens || false
    }

    // Public config (safe to expose to client — only the API key)
    nuxt.options.runtimeConfig.public.shopify = {
      apiKey: options.apiKey,
      authPagePath: options.authPage !== false ? '/auth' : '',
      authPathPrefix: options.authPathPrefix || '/_shopify/auth',
      navLinks: options.navLinks || []
    }

    // ─── Vite: Allow Tunnel Hosts ──────────────────────────────────────
    // Shopify dev uses Cloudflare tunnels with random subdomains — allow all hosts
    if (nuxt.options.dev) {
      nuxt.options.vite = nuxt.options.vite || {}
      nuxt.options.vite.server = nuxt.options.vite.server || {}
      nuxt.options.vite.server.allowedHosts = true
    }

    // ─── Aliases ───────────────────────────────────────────────────────
    // Allow importing from '#shopify/server' in server code
    nuxt.options.alias['#shopify/server'] = resolve('./runtime/server')

    // ─── Server Auto-Imports ───────────────────────────────────────────
    // Auto-import server utilities (useShopifyAdmin, useShopifyWebhook, etc.)
    addServerImportsDir(resolve('./runtime/server/utils'))

    // ─── Client Auto-Imports ───────────────────────────────────────────
    // Auto-import composables (useAppBridge, useShopifyFetch)
    addImportsDir(resolve('./runtime/composables'))

    // ─── Components ────────────────────────────────────────────────────
    // Auto-register Polaris components from the CDN as Vue components.
    const componentsDir = resolve('./runtime/components')
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: componentsDir,
        prefix: options.componentPrefix,
        pathPrefix: false,
        extensions: ['vue']
      })
    })

    // ─── App Bridge Head Tags (SSR) ─────────────────────────────────
    nuxt.hook('app:resolve', () => {
      nuxt.options.app.head = nuxt.options.app.head || {}
      nuxt.options.app.head.meta = [...(nuxt.options.app.head.meta || [])]

      nuxt.options.app.head.script = [
        // 1. Inline script to create the meta tag imperatively — guarantees it exists in the DOM before the CDN script executes.
        {
          key: 'shopify-api-key-meta',
          innerHTML: `var m=document.createElement('meta');m.name='shopify-api-key';m.content='${options.apiKey}';document.head.appendChild(m);`,
          tagPosition: 'head'
        },
        {
          src: 'https://cdn.shopify.com/shopifycloud/app-bridge.js',
          tagPosition: 'head'
        },
        {
          src: 'https://cdn.shopify.com/shopifycloud/polaris.js',
          tagPosition: 'head'
        },
        ...(nuxt.options.app.head.script || [])
      ]

      logger.info('Configuring Vue to recognize Shopify web components...')
      nuxt.options.vue.compilerOptions.isCustomElement = (tag) => {
        // Match Shopify Polaris (s-*) and App Bridge (ui-*) web component tags
        return tag.startsWith('s-') || tag.startsWith('ui-')
      }
    })

    // ─── Client Plugin ─────────────────────────────────────────────────
    // App Bridge npm package initialization (client-side only)
    addPlugin({
      src: resolve('./runtime/plugins/app-bridge'),
      mode: 'client'
    })

    // ─── Server Routes ─────────────────────────────────────────────────
    const authPrefix = options.authPathPrefix || '/_shopify/auth'

    // OAuth start
    addServerHandler({
      route: authPrefix,
      method: 'get',
      handler: resolve('./runtime/server/routes/auth')
    })

    // OAuth callback
    addServerHandler({
      route: `${authPrefix}/callback`,
      method: 'get',
      handler: resolve('./runtime/server/routes/auth-callback')
    })

    // Exit iframe page
    addServerHandler({
      route: `${authPrefix}/exit-iframe`,
      method: 'get',
      handler: resolve('./runtime/server/routes/auth-exit-iframe')
    })

    // Session token bounce page
    addServerHandler({
      route: `${authPrefix}/session-token`,
      method: 'get',
      handler: resolve('./runtime/server/routes/auth-session-token')
    })

    addRouteMiddleware({
      name: 'shopify-auth',
      path: resolve('./runtime/middleware/shopify-auth'),
      global: false
    })

    addRouteMiddleware({
      name: 'shopify-guest',
      path: resolve('./runtime/middleware/shopify-guest'),
      global: false
    })

    // ─── Auth Login Page ───────────────────────────────────────────────
    // Built-in /auth page with shop domain input for non-embedded flows.
    // Set `authPage: false` to disable, or provide a custom component path.
    if (options.authPage !== false) {
      logger.info(
        'Adding default /auth login page for non-embedded apps (can be customized or disabled with the authPage option)...'
      )
      extendPages((pages) => {
        pages.push({
          name: 'shopify-auth-login',
          path: '/auth',
          file: options.authPage || resolve('./runtime/pages/auth-login.vue')
        })
      })
    }

    // ─── Server Plugins ───
    addServerPlugin(resolve('./runtime/server/plugins/shopify-defaults'))
    addServerPlugin(resolve('./runtime/server/plugins/add-response-headers'))

    // ─── Transpile ─────────────────────────────────────────────────────
    nuxt.options.build.transpile.push(resolve('./runtime'))

    // Ensure @shopify/shopify-api adapter side-effects are preserved in the Nitro bundle
    nuxt.hook('ready', () => {
      const nitro = useNitro()

      nitro.options.externals.inline = nitro.options.externals.inline || []
      nitro.options.externals.inline.push(
        '@shopify/shopify-api',
        '@shopify/shopify-api/adapters/node',
        '@shopify/shopify-app-session-storage-memory',
        'isbot'
      )
    })

    // ─── Type Declarations ─────────────────────────────────────────────
    nuxt.hook('prepare:types', ({ references }) => {
      references.push({
        path: resolve('./runtime/types/index.ts')
      })
    })
  }
})
