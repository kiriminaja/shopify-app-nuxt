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
    appUrl: 'https://your-app-url.com'
  }
})
```

All values can also be set via environment variables:

| Option         | Env Variable                  |
| -------------- | ----------------------------- |
| `apiKey`       | `NUXT_SHOPIFY_API_KEY`        |
| `apiSecretKey` | `NUXT_SHOPIFY_API_SECRET_KEY` |
| `appUrl`       | `NUXT_SHOPIFY_APP_URL`        |

### Session storage

By default, the module provides an in-memory session storage (`MemorySessionStorage`) that works out of the box — no configuration needed. For production use, you should use a persistent session storage adapter.

To override the default session storage or configure lifecycle hooks, create a Nitro server plugin:

```ts
// server/plugins/shopify.ts
import { configureShopify } from '#shopify/server'
import { PrismaSessionStorage } from '@shopify/shopify-app-session-storage-prisma'
import { prisma } from '~/server/utils/prisma'

export default defineNitroPlugin(() => {
  configureShopify({
    sessionStorage: new PrismaSessionStorage(prisma),
    hooks: {
      afterAuth: async ({ session, admin }) => {
        // Register webhooks, seed data, etc.
      }
    }
  })
})
```

Any config passed to `configureShopify()` is merged with the defaults — you only need to specify what you want to override.

### Module options

| Option            | Type              | Default          | Description                                                             |
| ----------------- | ----------------- | ---------------- | ----------------------------------------------------------------------- |
| `apiKey`          | `string`          | —                | Your Shopify API key from the Partners dashboard                        |
| `apiSecretKey`    | `string`          | —                | Your Shopify API secret key                                             |
| `scopes`          | `string[]`        | `[]`             | OAuth scopes (optional — Shopify reads from `shopify.app.toml`)         |
| `appUrl`          | `string`          | —                | Your app's public URL (tunnel URL in development)                       |
| `apiVersion`      | `ApiVersion`      | Latest stable    | The Shopify API version to use                                          |
| `authPathPrefix`  | `string`          | `/_shopify/auth` | URL prefix for OAuth endpoints                                          |
| `distribution`    | `AppDistribution` | `app_store`      | App distribution type (`app_store`, `single_merchant`, `shopify_admin`) |
| `useOnlineTokens` | `boolean`         | `false`          | Use online (per-user) tokens in addition to offline (per-shop) tokens   |
| `authPage`        | `string \| false` | built-in page    | Custom auth page component path, or `false` to disable                  |
| `navLinks`        | `NavLink[]`       | `[]`             | Navigation links for the app sidebar (used by `<ShopifyAppProvider>`)   |

## Authenticating admin requests

Use `useShopifyAdmin()` in your server API routes to authenticate requests from the Shopify admin. The returned `admin` object provides **typed GraphQL** and REST clients powered by `@shopify/admin-api-client`:

```ts
// server/api/products.ts
export default defineEventHandler(async (event) => {
  const { admin, session } = await useShopifyAdmin(event)

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

  return await response.json()
})
```

#### GraphQL with variables

```ts
const response = await admin.graphql(
  `#graphql
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
      }
    }
  }`,
  {
    variables: {
      input: { title: 'New Product' }
    }
  }
)

const { data } = await response.json()
```

#### REST API

```ts
const products = await admin.rest.get({ path: 'products' })
await admin.rest.post({
  path: 'products',
  data: { product: { title: 'New Product' } }
})
```

#### Full `AdminContext` return type

| Property       | Type                       | Description                                        |
| -------------- | -------------------------- | -------------------------------------------------- |
| `session`      | `Session`                  | The authenticated Shopify session                  |
| `admin`        | `AdminApiContext`          | GraphQL and REST API clients                       |
| `sessionToken` | `JwtPayload \| undefined`  | Decoded session token (embedded apps only)         |
| `billing`      | `BillingContext`           | Helpers for `require()`, `check()`, `request()`    |
| `cors`         | `(response) => Response`   | Add CORS headers to a response                     |
| `redirect`     | `(url, init?) => Response` | Redirect helper that works inside embedded iframes |

## Handling webhooks

Use `useShopifyWebhook()` to validate and process incoming webhooks. HMAC verification is handled automatically:

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

#### Registering webhooks programmatically

```ts
// server/plugins/shopify.ts
import { configureShopify, registerShopifyWebhooks } from '#shopify/server'

export default defineNitroPlugin(() => {
  configureShopify({
    hooks: {
      afterAuth: async ({ session }) => {
        await registerShopifyWebhooks(session)
      }
    }
  })
})
```

> **Tip**: For most apps, registering webhooks via `shopify.app.toml` is sufficient. Use `registerShopifyWebhooks()` only when you need dynamic, per-shop webhook registration.

## Authenticating other request types

### Shopify Flow

```ts
// server/api/flow.ts
export default defineEventHandler(async (event) => {
  const { session, admin, payload } = await useShopifyFlow(event)
  // Handle Flow trigger/action
})
```

### Public requests (checkout extensions, etc.)

```ts
// server/api/public/widget.ts
export default defineEventHandler(async (event) => {
  const { sessionToken, cors } = await useShopifyPublic(event)
  // sessionToken contains the decoded JWT payload
  // Use cors() to wrap your response with CORS headers
})
```

### Unauthenticated access (background jobs)

For accessing the Shopify API without an incoming request (cron jobs, background tasks):

```ts
// server/api/cron/sync.ts
export default defineEventHandler(async () => {
  const { admin } = await useShopifyUnauthenticatedAdmin(
    'my-shop.myshopify.com'
  )

  const response = await admin.graphql(`{
    products(first: 10) { edges { node { id title } } }
  }`)

  return await response.json()
})
```

```ts
// Storefront API access
const { storefront } = await useShopifyUnauthenticatedStorefront(
  'my-shop.myshopify.com'
)

const response = await storefront.graphql(`{
  products(first: 10) { edges { node { id title } } }
}`)
```

Both the admin and storefront GraphQL clients are typed via `@shopify/admin-api-client` and `@shopify/storefront-api-client` respectively.

## Using App Bridge on the client

The module automatically injects the Shopify App Bridge CDN script and provides typed access via composables:

```vue
<script setup>
// Access the App Bridge instance (typed as ShopifyGlobal)
const shopify = useAppBridge()

// Get the current shop
const shop = shopify.config.shop
</script>
```

### Authenticated fetch

Use `useShopifyFetch()` for client-side API calls that automatically include the session token:

```vue
<script setup>
const shopifyFetch = useShopifyFetch()

const { data: products } = await useAsyncData(
  'products',
  () => shopifyFetch('/api/products'),
  { server: false }
)
</script>
```

> **Important**: Always use `server: false` with `useShopifyFetch()` — session tokens are only available on the client side within the Shopify admin iframe.

## Using Polaris components

### `<ShopifyAppProvider>`

Wrap your app pages with `<ShopifyAppProvider>` to automatically render the [App Bridge navigation menu](https://shopify.dev/docs/api/app-home/app-bridge-web-components/app-nav) from your module config:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['shopify-nuxt'],
  shopify: {
    // ...
    navLinks: [
      { label: 'Home', href: '/', rel: 'home' },
      { label: 'Products', href: '/products' },
      { label: 'Settings', href: '/settings' }
    ]
  }
})
```

```vue
<!-- layouts/default.vue -->
<template>
  <ShopifyAppProvider>
    <slot />
  </ShopifyAppProvider>
</template>
```

You can also override the links per-component via the `links` prop:

```vue
<ShopifyAppProvider :links="[{ label: 'Home', href: '/', rel: 'home' }]">
  <slot />
</ShopifyAppProvider>
```

Each `NavLink` has: `label` (string), `href` (string), and optionally `rel: 'home'` to set the default landing page.

### Polaris web components

This module provides Vue wrapper components for [Shopify Polaris web components](https://shopify.dev/docs/api/app-home/web-components). Use the `Sh`-prefixed wrappers instead of the raw `s-*` web components — they provide typed props with autocomplete, v-model support for form components, and work seamlessly with Vue's reactivity system.

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
      v-model="title"
      label="Product title"
      placeholder="Enter product title"
    />

    <ShSelect
      v-model="status"
      label="Status"
      :options="[
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' }
      ]"
    />
  </ShPage>
</template>
```

All `Sh*` components are auto-imported — no manual imports needed. Each component maps directly to its Polaris web component counterpart (e.g., `<ShButton>` → `<s-button>`, `<ShTextField>` → `<s-text-field>`).

### Available components

Layout & structure: `ShPage`, `ShBox`, `ShStack`, `ShGrid`, `ShGridItem`, `ShSection`, `ShDivider`

Actions: `ShButton`, `ShButtonGroup`, `ShClickable`, `ShLink`

Forms: `ShTextField`, `ShNumberField`, `ShEmailField`, `ShPasswordField`, `ShUrlField`, `ShMoneyField`, `ShColorField`, `ShDateField`, `ShTextArea`, `ShSelect`, `ShCheckbox`, `ShSwitch`, `ShChoiceList`, `ShChoice`, `ShSearchField`, `ShDropZone`, `ShColorPicker`, `ShDatePicker`

Feedback: `ShBanner`, `ShBadge`, `ShSpinner`, `ShTooltip`

Navigation: `ShAppNav`, `ShMenu`, `ShOption`, `ShOptionGroup`, `ShPopover`

Data: `ShTable`, `ShTableHeader`, `ShTableHeaderRow`, `ShTableBody`, `ShTableRow`, `ShTableCell`

Content: `ShText`, `ShHeading`, `ShParagraph`, `ShIcon`, `ShImage`, `ShThumbnail`, `ShAvatar`, `ShChip`, `ShClickableChip`, `ShListItem`, `ShOrderedList`, `ShUnorderedList`

Other: `ShModal`, `ShQueryContainer`

### Using `ShModal`

`ShModal` wraps the [Polaris `<s-modal>`](https://shopify.dev/docs/api/app-home/web-components/overlays/modal) component — it renders **inside** your app's iframe. Open and close it using `commandFor` / `command` attributes:

```vue
<template>
  <ShButton command-for="my-modal" command="--show">Open</ShButton>

  <ShModal id="my-modal" heading="Confirm action">
    <ShParagraph>Are you sure?</ShParagraph>

    <ShButton slot="secondary-actions" command-for="my-modal" command="--hide">
      Cancel
    </ShButton>
    <ShButton
      slot="primary-action"
      variant="primary"
      command-for="my-modal"
      command="--hide"
    >
      Confirm
    </ShButton>
  </ShModal>
</template>
```

> **Note**: `ShModal` is **not** the same as the [App Bridge `<ui-modal>`](https://shopify.dev/docs/api/app-bridge-library/apis/modal) which renders outside the iframe and is controlled via `shopify.modal.show(id)`. If you need the App Bridge modal, use `<ui-modal>` directly.

## OAuth routes

The module automatically registers these routes:

| Route                              | Purpose                                |
| ---------------------------------- | -------------------------------------- |
| `GET /_shopify/auth`               | Start the OAuth flow                   |
| `GET /_shopify/auth/callback`      | Handle the OAuth callback from Shopify |
| `GET /_shopify/auth/exit-iframe`   | App Bridge iframe escape page          |
| `GET /_shopify/auth/session-token` | Session token bounce page              |

The prefix `/_shopify/auth` is configurable via the `authPathPrefix` option.

## Loading your app in Shopify Admin

To load your app within the Shopify Admin, you need to:

1. Update your app's URL in your Partners Dashboard app setup page to your app URL (e.g., `https://your-app-url.com`)
1. Update your app's callback URL to `https://your-app-url.com/_shopify/auth/callback` in that same page
1. Go to **Test your app** in Partners Dashboard and select your development store

## Features

| Feature             | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| **Authentication**  | OAuth flow, session tokens, token exchange — all handled automatically          |
| **App Bridge**      | CDN-based App Bridge with full TypeScript types via `@shopify/app-bridge-types` |
| **Polaris**         | Vue wrapper components (`Sh*`) for all Polaris web components with typed props  |
| **Typed GraphQL**   | Admin and Storefront API clients typed via `@shopify/admin-api-client`          |
| **Webhooks**        | HMAC validation, payload parsing, and webhook registration                      |
| **Admin API**       | GraphQL and REST clients with automatic session management                      |
| **Storefront API**  | Typed GraphQL client for Storefront API via `@shopify/storefront-api-client`    |
| **Billing**         | Billing context for subscription and usage-based charges                        |
| **Session storage** | Built-in `MemorySessionStorage` default, pluggable via `configureShopify()`     |
| **Auto-imports**    | Server utilities, client composables, and components are auto-imported          |
| **Bot detection**   | Admin auth automatically detects bots and returns 410 to avoid unnecessary auth |
| **CORS**            | Built-in CORS helpers for public/checkout extension endpoints                   |

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

### `#shopify/server` exports

For use in Nitro plugins and advanced server-side configuration:

```ts
import {
  configureShopify,
  getShopifyApi,
  getResolvedConfig,
  getSessionStorage,
  registerShopifyWebhooks,
  createAdminApiContext,
  createStorefrontApiContext
} from '#shopify/server'

// Types
import type {
  AdminApiContext,
  StorefrontApiContext,
  GraphQLClient,
  GraphQLQueryOptions,
  GraphQLResponse
} from '#shopify/server'
```

## Client composables

These are auto-imported in your Vue components:

| Composable          | Purpose                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `useAppBridge()`    | Returns typed `ShopifyGlobal` from App Bridge CDN                    |
| `useShopifyFetch()` | Fetch wrapper with automatic session token in `Authorization` header |

## Testing your app

This package exports test helpers through `shopify-nuxt/test-helpers` to simplify testing:

```ts
import { testConfig, testSession } from 'shopify-nuxt/test-helpers'

// testConfig() returns a dummy configuration for testing
const config = testConfig()

// testSession() returns a mock Shopify session
const session = testSession()

// Both accept overrides
const customConfig = testConfig({ apiKey: 'custom-key' })
const customSession = testSession({ shop: 'custom-shop.myshopify.com' })
```

## TypeScript

The module augments Nuxt's `RuntimeConfig` types so you get full autocomplete and type safety when accessing config:

```ts
// Server — all Shopify config fields are typed
const config = useRuntimeConfig()
config.shopify.apiKey // string
config.shopify.apiSecretKey // string
config.shopify.scopes // string[]
config.shopify.appUrl // string

// Client — only public fields
const publicConfig = useRuntimeConfig().public
publicConfig.shopify.apiKey // string
publicConfig.shopify.authPagePath // string
publicConfig.shopify.authPathPrefix // string
```

The types are declared via module augmentation in `nuxt/schema`:

| Interface             | Key       | Fields                                                                                                          |
| --------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `RuntimeConfig`       | `shopify` | `apiKey`, `apiSecretKey`, `scopes`, `appUrl`, `apiVersion`, `authPathPrefix`, `distribution`, `useOnlineTokens` |
| `PublicRuntimeConfig` | `shopify` | `apiKey`, `authPagePath`, `authPathPrefix`                                                                      |

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

Session storage adapters:

- [`@shopify/shopify-app-session-storage-prisma`](https://www.npmjs.com/package/@shopify/shopify-app-session-storage-prisma)
- [`@shopify/shopify-app-session-storage-drizzle`](https://www.npmjs.com/package/@shopify/shopify-app-session-storage-drizzle)
- [`@shopify/shopify-app-session-storage-redis`](https://www.npmjs.com/package/@shopify/shopify-app-session-storage-redis)
- [`@shopify/shopify-app-session-storage-mongodb`](https://www.npmjs.com/package/@shopify/shopify-app-session-storage-mongodb)
- [`@shopify/shopify-app-session-storage-memory`](https://www.npmjs.com/package/@shopify/shopify-app-session-storage-memory) (default, not for production)

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
