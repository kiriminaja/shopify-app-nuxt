# shopify-nuxt — Copilot Instructions

## Project Overview

`shopify-nuxt` is a **Nuxt 4 module** that integrates Shopify into Nuxt applications — providing authentication, webhooks, billing, session management, and App Bridge. It is the Nuxt equivalent of `@shopify/shopify-app-react-router`.

**Package manager:** Bun (`bun install`, `bun run <script>`)

## Commands

| Command               | Purpose                              |
| --------------------- | ------------------------------------ |
| `bun run dev:prepare` | Stub module + generate types for dev |
| `bun run dev`         | Start playground dev server          |
| `bun run lint`        | ESLint (flat config)                 |
| `bun run test`        | Vitest e2e tests                     |
| `bun run prepack`     | Build for publish                    |

Always run `bun run dev:prepare` after changing module options, routes, or auto-imports.

## Architecture

### Module Entry (`src/module.ts`)

- Config key: `shopify` in `nuxt.config.ts`
- Registers: server routes, middleware, auto-imports, components, plugins, head tags
- Runtime config split:
  - **Server** (`runtimeConfig.shopify`): all secrets (apiKey, apiSecretKey, scopes, appUrl, etc.)
  - **Public** (`runtimeConfig.public.shopify`): only `apiKey` (safe for client)

### App Bridge (CDN-based)

The module uses Shopify's **CDN-based App Bridge** (not the deprecated npm package):

- Meta tag `<meta name="shopify-api-key">` and CDN script are injected via SSR head in `module.ts`
- Client plugin (`src/runtime/plugins/app-bridge.ts`) exposes `window.shopify` as `$shopifyBridge`
- Types come from `@shopify/app-bridge-types` (declares `ShopifyGlobal` on `window.shopify`)

**Do NOT use `@shopify/app-bridge` npm package** — it is deprecated. Always use the CDN approach.

### Server-Side Configuration

Simple values go in `nuxt.config.ts`. Complex runtime objects (session storage, hooks) go in a **Nitro plugin** using `configureShopify()`:

```ts
// server/plugins/shopify.ts
import { configureShopify } from '#shopify/server'
import { MemorySessionStorage } from '@shopify/shopify-app-session-storage-memory'

export default defineNitroPlugin(() => {
  configureShopify({
    sessionStorage: new MemorySessionStorage(),
    hooks: {
      afterAuth: async ({ session, admin }) => {
        // post-auth logic
      }
    }
  })
})
```

### Server Utilities (auto-imported in server/)

| Utility                                     | Purpose                                               |
| ------------------------------------------- | ----------------------------------------------------- |
| `useShopifyAdmin(event)`                    | Authenticate admin requests (token exchange, session) |
| `useShopifyWebhook(event)`                  | Validate webhook HMAC + parse payload                 |
| `useShopifyFlow(event)`                     | Authenticate Shopify Flow extension requests          |
| `useShopifyPublic(event)`                   | Authenticate public/checkout requests                 |
| `useShopifyPos(event)`                      | Authenticate POS extension requests                   |
| `useShopifyFulfillmentService(event)`       | Authenticate fulfillment service callbacks            |
| `useShopifyLogin(event)`                    | Handle merchant login (non-embedded apps)             |
| `useShopifyUnauthenticatedAdmin(shop)`      | Offline session admin API access                      |
| `useShopifyUnauthenticatedStorefront(shop)` | Offline session storefront API access                 |
| `registerShopifyWebhooks(session)`          | Register webhooks for a shop                          |

### Client Composables (auto-imported)

| Composable          | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `useAppBridge()`    | Returns typed `ShopifyGlobal` from App Bridge CDN      |
| `useShopifyFetch()` | Fetch wrapper with automatic session token auth header |

### Components (auto-registered)

- `<ShopifyAppProvider>` — Semantic wrapper for embedded app pages
- `<ShopifyAppProxyProvider>` — Wrapper for app proxy pages

### OAuth Routes (auto-registered)

| Route                              | Purpose                       |
| ---------------------------------- | ----------------------------- |
| `GET /_shopify/auth`               | Start OAuth flow              |
| `GET /_shopify/auth/callback`      | Handle OAuth callback         |
| `GET /_shopify/auth/exit-iframe`   | App Bridge iframe escape page |
| `GET /_shopify/auth/session-token` | Session token bounce page     |

The prefix `/_shopify/auth` is configurable via `authPathPrefix`.

## Key Dependencies

| Package                                | Purpose                                           |
| -------------------------------------- | ------------------------------------------------- |
| `@shopify/shopify-api`                 | Core Shopify API (OAuth, sessions, GraphQL, REST) |
| `@shopify/shopify-app-session-storage` | Session storage interface                         |
| `@shopify/app-bridge-types`            | TypeScript types for CDN App Bridge               |
| `isbot`                                | Bot detection for admin auth                      |

## h3 API Rules (Critical)

The server runs on h3 (Nitro). Always use these h3 functions — **never** access `event.req`/`event.res` directly:

| Do                                          | Don't                                       |
| ------------------------------------------- | ------------------------------------------- |
| `getHeader(event, 'name')`                  | `event.req.headers.get('name')`             |
| `setResponseHeader(event, 'name', 'value')` | `event.res.headers.set('name', 'value')`    |
| `readRawBody(event)`                        | `event.req.text()`                          |
| `getQuery(event)`                           | `event.req.url` parsing                     |
| `sendRedirect(event, url, 302)`             | `event.res.redirect(url)` (3 args required) |
| Return HTML string directly                 | `send(event, html)` (may not exist)         |

## Shopify API Rules

- **Always** import `@shopify/shopify-api/adapters/node` before calling `shopifyApi()` (done in `services/shopify.ts`)
- **Do NOT use** `api.utils.createHmac` — it doesn't exist. Use `node:crypto` `createHmac` for HMAC verification
- The `shopifyApi()` call may need `as any` for FutureFlags type compatibility

## File Organization

```
src/
├── module.ts                          # Nuxt module entry
├── runtime/
│   ├── types.ts                       # Shared types and enums
│   ├── plugins/
│   │   └── app-bridge.ts              # Client plugin (CDN window.shopify)
│   ├── composables/
│   │   ├── useAppBridge.ts            # Typed App Bridge accessor
│   │   └── useShopifyFetch.ts         # Authenticated fetch wrapper
│   ├── components/
│   │   ├── ShopifyAppProvider.vue     # Embedded app wrapper
│   │   └── ShopifyAppProxyProvider.vue # App proxy wrapper
│   └── server/
│       ├── index.ts                   # Barrel (#shopify/server alias)
│       ├── services/
│       │   └── shopify.ts             # configureShopify() + singletons
│       ├── utils/
│       │   ├── helpers.ts             # h3 adapters, HMAC, CORS, bot detection
│       │   ├── clients.ts            # Admin API context factory
│       │   ├── authenticate-admin.ts  # useShopifyAdmin
│       │   ├── authenticate-webhook.ts # useShopifyWebhook
│       │   ├── authenticate-flow.ts   # useShopifyFlow
│       │   ├── authenticate-public.ts # useShopifyPublic
│       │   ├── authenticate-pos.ts    # useShopifyPos
│       │   ├── authenticate-fulfillment-service.ts
│       │   ├── login.ts              # useShopifyLogin
│       │   ├── unauthenticated-admin.ts
│       │   ├── unauthenticated-storefront.ts
│       │   └── register-webhooks.ts
│       ├── routes/
│       │   ├── auth.ts               # OAuth start
│       │   ├── auth-callback.ts      # OAuth callback
│       │   ├── auth-exit-iframe.ts   # Exit iframe page
│       │   └── auth-session-token.ts # Session token bounce
│       ├── middleware/
│       │   └── shopify-csp.ts        # CSP frame-ancestors
│       └── test-helpers/
│           └── index.ts              # testConfig(), testSession()
```

## Testing

- Tests are in `test/basic.test.ts` using `@nuxt/test-utils/e2e`
- Test fixture at `test/fixtures/basic/` with its own `nuxt.config.ts`
- The test builds a real Nuxt app and makes HTTP requests against it
- Auth route tests expect errors (no real Shopify credentials) but verify the route is not 404

## Nuxt Module Conventions

- **No barrel index files** in `composables/` or `server/utils/` — Nuxt auto-scans directories. Barrel files cause duplicate import warnings.
- Server utils are auto-imported via `addServerImportsDir`
- Client composables are auto-imported via `addImportsDir`
- Components are auto-registered via `addComponentsDir`
