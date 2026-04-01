# `shopify-app-nuxt`

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![npm version](https://badge.fury.io/js/shopify-app-nuxt.svg)](https://badge.fury.io/js/shopify-app-nuxt)
[![NPM Downloads](https://img.shields.io/npm/dm/shopify-app-nuxt)](https://npmtrends.com/shopify-app-nuxt)
[![Nuxt](https://img.shields.io/badge/Nuxt-020420?logo=nuxt)](https://nuxt.com)

A [Nuxt](https://nuxt.com/) module for building Shopify apps — authentication, webhooks, billing, Polaris components, and App Bridge integration. The Nuxt equivalent of `@shopify/shopify-app-react-router`.

## Quick start

```bash
npx nuxi@latest module add shopify-app-nuxt
```

Then configure your API credentials and app URL in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['shopify-app-nuxt'],
  shopify: {
    apiKey: 'your-api-key',
    apiSecretKey: 'your-api-secret',
    appUrl: 'https://your-app-url.com'
  }
})
```

## Documentation

For full documentation, guides, and API reference, visit the docs:

**[https://shopify-app-nuxt.vercel.app](https://shopify-app-nuxt.vercel.app)**

## License

[MIT](LICENSE.md)

## Contributing

### Local development

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
