---
seo:
  title: Can we develop Shopify Apps with Nuxt? Yes you can.
  description:
    Ship fast, flexible, and SEO-optimized documentation with beautiful
    design out of the box. Docus brings together the best of the Nuxt ecosystem.
    Powered by Nuxt UI.
---

::u-page-hero
#title
Build Shopify Apps with Nuxt

#description
`shopify-app-nuxt` is a Nuxt 4 module that provides authentication, webhooks, Polaris components, and App Bridge integration for building Shopify apps with Nuxt. Inspired by `@shopify/shopify-app-react-router`, it brings the same capabilities to the Nuxt ecosystem.

#headline
  :::u-button
  ---
  size: sm
  to: /getting-started/introduction
  variant: outline
  ---
  A @shopify/shopify-app-react-router for Nuxt
  :::

#links
  :::u-button
  ---
  size: xl
  to: /getting-started/introduction
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::copy-code-input{source="npx nuxt module add color-mode"}
  :::
::


::u-page-section
#title
Built on proven tools

#description
Vue for the frontend. Nitro for the server. Shopify for commerce.

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-vuedotjs
  target: _blank
  to: https://vuejs.org
  ---
  #title
  Frontend with [Vue.js]{.text-primary}

  #description
  Built on top of Vue.js and its reactive, component-based architecture — giving you a familiar and productive developer experience.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-vite
  target: _blank
  to: https://vite.dev
  ---
  #title
  Bundled with [Vite]{.text-primary}

  #description
  Leverages Vite's lightning-fast HMR and build pipeline for an instant feedback loop during development.
  :::

  :::u-page-feature
  ---
  icon: i-ph-lightning
  target: _blank
  to: https://nitro.build
  ---
  #title
  Server with [Nitro]{.text-primary}

  #description
  Powered by Nitro for versatile, edge-ready server routes — deploy to any platform with zero configuration.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-nuxt
  target: _blank
  to: https://devtools.nuxt.com
  ---
  #title
  [Nuxt DevTools]{.text-primary} Experience

  #description
  Inspect components, routes, modules, and state in real time with Nuxt DevTools — making debugging and development a breeze.
  :::
::


::u-page-section
#title
What you get?

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-nuxt
  target: _blank
  to: https://nuxt.com
  ---
  #title
  Built for [Nuxt]{.text-primary}

  #description
  First-class Nuxt module with auto-imported composables, server utilities, and components. Works seamlessly with Nuxt 3 and 4.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  to: /getting-started/introduction
  ---
  #title
  Blazing [Fast]{.text-primary}

  #description
  Powered by Vite for instant HMR, Nitro for edge-ready server routes, and the Nuxt module system for zero-config integration.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield
  to: /api/server-utilities
  ---
  #title
  Secure [Authentication]{.text-primary}

  #description
  OAuth, session token exchange, and HMAC verification built-in. Authenticate admin, webhook, flow, public, and POS requests with a single composable.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-webhook
  to: /guides/webhooks
  ---
  #title
  [Webhooks]{.text-primary} Made Easy

  #description
  Register and handle Shopify webhooks with automatic HMAC validation. Just define your handlers and the module takes care of the rest.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layout-template
  to: /guides/polaris-components
  ---
  #title
  [Polaris]{.text-primary} Web Components

  #description
  Use Shopify's official Polaris Web Components directly in your Vue templates — no wrappers needed. Get the exact same look and feel as the Shopify admin.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-blocks
  to: /guides/app-bridge
  ---
  #title
  [App Bridge]{.text-primary} Integration

  #description
  CDN-based App Bridge setup with typed composables. Navigate, show toasts, and interact with the Shopify admin iframe out of the box.
  :::
::