# `shopify-nuxt`

> **NOTE** This package is in early alpha and is not yet recommended for production use. The API may change without a major version bump. Please try it out and share your feedback!

<!-- ![Build Status]() -->

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![npm version](https://badge.fury.io/js/shopify-nuxt.svg)](https://badge.fury.io/js/shopify-nuxt)
[![Nuxt](https://img.shields.io/badge/Nuxt-020420?logo=nuxt)](https://nuxt.com)

This package makes it easy to use [Nuxt](https://nuxt.com/) to build Shopify apps.

It builds on the `@shopify/shopify-api` package and creates a Nuxt module layer that allows your app to communicate with and authenticate requests from Shopify.

> **Note**: this package will enable your app's backend to work with Shopify APIs, and by default it will behave as an [embedded app](https://shopify.dev/docs/apps/auth/oauth/session-tokens). It uses the CDN-based [Shopify App Bridge](https://shopify.dev/docs/apps/tools/app-bridge) for frontend authentication.

## Requirements

To follow these usage guides, you will need to:

- Have a [Shopify Partner account](https://partners.shopify.com/signup) and development store
- Have an app already set up on your partner account
- Have a JavaScript package manager such as [bun](https://bun.sh), [yarn](https://yarnpkg.com), or [npm](https://www.npmjs.com/) installed
- Have [Nuxt](https://nuxt.com/) v4 or later installed

## Getting started

Install the module to your Nuxt application:

```bash
# Using bun
bun add shopify-nuxt

# Using npm
npm install shopify-nuxt

# Using yarn
yarn add shopify-nuxt
```

Then add `shopify-nuxt` to the `modules` section and configure it in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['shopify-nuxt'],

  shopify: {
    apiKey: 'ApiKeyFromPartnersDashboard',
    apiSecretKey: 'ApiSecretKeyFromPartnersDashboard',
    scopes: ['read_products', 'write_products'],
    appUrl: 'https://your-app-url.com'
  }
})
```

For session storage and post-auth hooks, create a Nitro server plugin:

```ts
// server/plugins/shopify.ts
import { configureShopify } from '#shopify/server'
import { MemorySessionStorage } from '@shopify/shopify-app-session-storage-memory'

export default defineNitroPlugin(() => {
  configureShopify({
    sessionStorage: new MemorySessionStorage(),
    hooks: {
      afterAuth: async ({ session, admin }) => {
        // Register webhooks, seed data, etc.
      }
    }
  })
})
```

### Authenticating admin requests

Use `useShopifyAdmin()` in your server API routes to authenticate requests from the Shopify admin:

```ts
// server/api/products.ts
export default defineEventHandler(async (event) => {
  const { admin } = await useShopifyAdmin(event)

  const response = await admin.graphql(`{
    products(first: 5) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`)

  return response
})
```

### Handling webhooks

Use `useShopifyWebhook()` to validate and process incoming webhooks:

```ts
// server/api/webhooks.ts
export default defineEventHandler(async (event) => {
  const { topic, shop, payload } = await useShopifyWebhook(event)

  switch (topic) {
    case 'APP_UNINSTALLED':
      // Clean up shop data
      break
    case 'PRODUCTS_CREATE':
      // Handle new product
      break
  }

  return { success: true }
})
```

### Using App Bridge on the client

The module automatically injects the Shopify App Bridge CDN script and provides typed access via composables:

```vue
<script setup>
// Access the App Bridge instance (typed as ShopifyGlobal)
const shopify = useAppBridge()

// Or use the authenticated fetch wrapper
const shopifyFetch = useShopifyFetch()
const { data } = await shopifyFetch('/api/products')
</script>

<template>
  <ShopifyAppProvider>
    <!-- Your app content -->
  </ShopifyAppProvider>
</template>
```

### Using Polaris components

This module provides Vue wrapper components for [Shopify Polaris web components](https://shopify.dev/docs/api/app-home/web-components). Use the `Sh`-prefixed wrappers instead of the raw `s-*` web components — they provide typed props with autocomplete and work seamlessly with Vue's reactivity system.

```vue
<template>
  <ShPage heading="Products">
    <ShStack gap="base">
      <ShButton variant="primary" @click="save">Save</ShButton>
      <ShButton @click="cancel">Cancel</ShButton>
    </ShStack>

    <ShBanner heading="Welcome" tone="info" dismissible>
      Start by adding your first product.
    </ShBanner>

    <ShTextField
      label="Product title"
      :value="title"
      placeholder="Enter product title"
    />
  </ShPage>
</template>
```

All `Sh*` components are auto-imported — no manual imports needed. Each component maps directly to its Polaris web component counterpart (e.g., `<ShButton>` → `<s-button>`, `<ShTextField>` → `<s-text-field>`).

### Loading your app in Shopify Admin

To load your app within the Shopify Admin, you need to:

1. Update your app's URL in your Partners Dashboard app setup page to your app URL (e.g., `https://your-app-url.com`)
1. Update your app's callback URL to `https://your-app-url.com/_shopify/auth/callback` in that same page
1. Go to **Test your app** in Partners Dashboard and select your development store

## Features

| Feature              | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| **Authentication**   | OAuth flow, session tokens, token exchange — all handled automatically          |
| **App Bridge**       | CDN-based App Bridge with full TypeScript types via `@shopify/app-bridge-types` |
| **Polaris**          | Vue wrapper components (`Sh*`) for all Polaris web components with typed props  |
| **Webhooks**         | HMAC validation, payload parsing, and webhook registration                      |
| **Admin API**        | GraphQL and REST clients with automatic session management                      |
| **Billing**          | Billing context for subscription and usage-based charges                        |
| **Session storage**  | Pluggable session storage via `@shopify/shopify-app-session-storage`            |
| **CSP headers**      | Automatic `frame-ancestors` headers for embedded apps                           |
| **Auto-imports**     | Server utilities and client composables are auto-imported                       |

## Server utilities

These are auto-imported in your `server/` directory:

| Utility                                     | Purpose                                               |
| ------------------------------------------- | ----------------------------------------------------- |
| `useShopifyAdmin(event)`                    | Authenticate admin requests (token exchange, session) |
| `useShopifyWebhook(event)`                  | Validate webhook HMAC + parse payload                 |
| `useShopifyFlow(event)`                     | Authenticate Shopify Flow extension requests          |
| `useShopifyPublic(event)`                   | Authenticate public/checkout extension requests       |
| `useShopifyPos(event)`                      | Authenticate POS extension requests                   |
| `useShopifyFulfillmentService(event)`       | Authenticate fulfillment service callbacks            |
| `useShopifyLogin(event)`                    | Handle merchant login (non-embedded apps)             |
| `useShopifyUnauthenticatedAdmin(shop)`      | Offline session admin API access                      |
| `useShopifyUnauthenticatedStorefront(shop)` | Offline session storefront API access                 |
| `registerShopifyWebhooks(session)`          | Register webhooks for a shop                          |

## Client composables

These are auto-imported in your Vue components:

| Composable          | Purpose                                           |
| ------------------- | ------------------------------------------------- |
| `useAppBridge()`    | Returns typed `ShopifyGlobal` from App Bridge CDN |
| `useShopifyFetch()` | Fetch wrapper with automatic session token auth   |

## Testing your app

This package exports test helpers through `shopify-nuxt/test-helpers` to simplify testing:

```ts
import { testConfig, testSession } from 'shopify-nuxt/test-helpers'

// testConfig() returns a dummy configuration for testing
const config = testConfig()

// testSession() returns a mock Shopify session
const session = testSession()
```

## Resources

Getting started:

- [Nuxt docs](https://nuxt.com/docs)
- [Build a Shopify app](https://shopify.dev/docs/apps/build/build)

Shopify:

- [Intro to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [Shopify App Bridge](https://shopify.dev/docs/api/app-bridge-library)
- [Polaris Web Components](https://shopify.dev/docs/api/app-home/using-polaris-components)
- [App extensions](https://shopify.dev/docs/apps/app-extensions/list)
- [Shopify Functions](https://shopify.dev/docs/api/functions)

## Contributing

<details>
  <summary>Local development</summary>

```bash
# Install dependencies
bun install

# Generate type stubs
bun run dev:prepare

# Develop with the playground
bun run dev

# Build the playground
bun run dev:build

# Run ESLint
bun run lint

# Run Vitest
bun run test
bun run test:watch

# Release new version
bun run release
```

</details>
