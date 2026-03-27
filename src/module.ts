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
    // Auto-register Vue components (ShopifyAppProvider, ShopifyAppProxyProvider)
    addComponentsDir({
      path: resolver.resolve('./runtime/components')
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

// Vue type bridge for Shopify Polaris web components.
// @shopify/polaris-types augments HTMLElementTagNameMap with s-* elements.
// This declaration maps them into Vue's IntrinsicElements so templates get
// proper type-checking and autocomplete.

type PolarisElementProps<T> = {
  [K in keyof T as K extends \`on\${string}\` ? never : K]?: T[K]
} & {
  [K in keyof T as K extends \`on\${infer E}\` ? \`on\${Capitalize<E>}\` : never]?: (event: Event) => void
} & {
  slot?: string
  class?: string
  style?: string | Record<string, string>
}

declare module 'vue' {
  interface HTMLAttributes {
    slot?: string
  }
}

declare module '@vue/runtime-dom' {
  interface IntrinsicElements {
    's-avatar': PolarisElementProps<HTMLElementTagNameMap['s-avatar']>
    's-badge': PolarisElementProps<HTMLElementTagNameMap['s-badge']>
    's-banner': PolarisElementProps<HTMLElementTagNameMap['s-banner']>
    's-box': PolarisElementProps<HTMLElementTagNameMap['s-box']>
    's-button': PolarisElementProps<HTMLElementTagNameMap['s-button']>
    's-button-group': PolarisElementProps<HTMLElementTagNameMap['s-button-group']>
    's-checkbox': PolarisElementProps<HTMLElementTagNameMap['s-checkbox']>
    's-chip': PolarisElementProps<HTMLElementTagNameMap['s-chip']>
    's-choice': PolarisElementProps<HTMLElementTagNameMap['s-choice']>
    's-choice-list': PolarisElementProps<HTMLElementTagNameMap['s-choice-list']>
    's-clickable': PolarisElementProps<HTMLElementTagNameMap['s-clickable']>
    's-clickable-chip': PolarisElementProps<HTMLElementTagNameMap['s-clickable-chip']>
    's-color-field': PolarisElementProps<HTMLElementTagNameMap['s-color-field']>
    's-color-picker': PolarisElementProps<HTMLElementTagNameMap['s-color-picker']>
    's-date-field': PolarisElementProps<HTMLElementTagNameMap['s-date-field']>
    's-date-picker': PolarisElementProps<HTMLElementTagNameMap['s-date-picker']>
    's-divider': PolarisElementProps<HTMLElementTagNameMap['s-divider']>
    's-drop-zone': PolarisElementProps<HTMLElementTagNameMap['s-drop-zone']>
    's-email-field': PolarisElementProps<HTMLElementTagNameMap['s-email-field']>
    's-grid': PolarisElementProps<HTMLElementTagNameMap['s-grid']>
    's-grid-item': PolarisElementProps<HTMLElementTagNameMap['s-grid-item']>
    's-heading': PolarisElementProps<HTMLElementTagNameMap['s-heading']>
    's-icon': PolarisElementProps<HTMLElementTagNameMap['s-icon']>
    's-image': PolarisElementProps<HTMLElementTagNameMap['s-image']>
    's-link': PolarisElementProps<HTMLElementTagNameMap['s-link']>
    's-list-item': PolarisElementProps<HTMLElementTagNameMap['s-list-item']>
    's-menu': PolarisElementProps<HTMLElementTagNameMap['s-menu']>
    's-modal': PolarisElementProps<HTMLElementTagNameMap['s-modal']>
    's-money-field': PolarisElementProps<HTMLElementTagNameMap['s-money-field']>
    's-number-field': PolarisElementProps<HTMLElementTagNameMap['s-number-field']>
    's-option': PolarisElementProps<HTMLElementTagNameMap['s-option']>
    's-option-group': PolarisElementProps<HTMLElementTagNameMap['s-option-group']>
    's-ordered-list': PolarisElementProps<HTMLElementTagNameMap['s-ordered-list']>
    's-page': PolarisElementProps<HTMLElementTagNameMap['s-page']>
    's-paragraph': PolarisElementProps<HTMLElementTagNameMap['s-paragraph']>
    's-password-field': PolarisElementProps<HTMLElementTagNameMap['s-password-field']>
    's-popover': PolarisElementProps<HTMLElementTagNameMap['s-popover']>
    's-query-container': PolarisElementProps<HTMLElementTagNameMap['s-query-container']>
    's-search-field': PolarisElementProps<HTMLElementTagNameMap['s-search-field']>
    's-section': PolarisElementProps<HTMLElementTagNameMap['s-section']>
    's-select': PolarisElementProps<HTMLElementTagNameMap['s-select']>
    's-spinner': PolarisElementProps<HTMLElementTagNameMap['s-spinner']>
    's-stack': PolarisElementProps<HTMLElementTagNameMap['s-stack']>
    's-switch': PolarisElementProps<HTMLElementTagNameMap['s-switch']>
    's-table': PolarisElementProps<HTMLElementTagNameMap['s-table']>
    's-table-body': PolarisElementProps<HTMLElementTagNameMap['s-table-body']>
    's-table-cell': PolarisElementProps<HTMLElementTagNameMap['s-table-cell']>
    's-table-header': PolarisElementProps<HTMLElementTagNameMap['s-table-header']>
    's-table-header-row': PolarisElementProps<HTMLElementTagNameMap['s-table-header-row']>
    's-table-row': PolarisElementProps<HTMLElementTagNameMap['s-table-row']>
    's-text': PolarisElementProps<HTMLElementTagNameMap['s-text']>
    's-text-area': PolarisElementProps<HTMLElementTagNameMap['s-text-area']>
    's-text-field': PolarisElementProps<HTMLElementTagNameMap['s-text-field']>
    's-thumbnail': PolarisElementProps<HTMLElementTagNameMap['s-thumbnail']>
    's-tooltip': PolarisElementProps<HTMLElementTagNameMap['s-tooltip']>
    's-url-field': PolarisElementProps<HTMLElementTagNameMap['s-url-field']>
    's-unordered-list': PolarisElementProps<HTMLElementTagNameMap['s-unordered-list']>
    // App-level components (not in @shopify/polaris-types)
    's-app-nav': { class?: string; style?: string | Record<string, string>; slot?: string }
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
