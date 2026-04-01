# Changelog

## v0.0.18

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.17...v0.0.18)

### 🚀 Enhancements

- Enhance ShUiTitleBar and ShUiSaveBar components with typed action props ([7c34ecd](https://github.com/kiriminaja/shopify-app-nuxt/commit/7c34ecd))

### 🩹 Fixes

- Handle BotActivityDetected error in auth callback and improve session token validation ([28c656d](https://github.com/kiriminaja/shopify-app-nuxt/commit/28c656d))

### 💅 Refactors

- Remove Polaris types and introduce PolarisIcon type ([3ad9cdf](https://github.com/kiriminaja/shopify-app-nuxt/commit/3ad9cdf))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.17

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.16...v0.0.17)

### 🚀 Enhancements

- Implement centralized logging for App Bridge and OAuth callback ([72795e5](https://github.com/kiriminaja/shopify-app-nuxt/commit/72795e5))
- Add middleware and types documentation for Shopify authentication ([39863fc](https://github.com/kiriminaja/shopify-app-nuxt/commit/39863fc))
- Add CopyCodeInput component for easy code copying ([eb1efb2](https://github.com/kiriminaja/shopify-app-nuxt/commit/eb1efb2))
- Add component prefix and rename ShopifyAppProvider as ShApp ([2954fee](https://github.com/kiriminaja/shopify-app-nuxt/commit/2954fee))

### 💅 Refactors

- Remove logger usage and replace with console methods in app-bridge and auth-callback ([b4fae65](https://github.com/kiriminaja/shopify-app-nuxt/commit/b4fae65))

### 🏡 Chore

- Update TypeScript version to 5 and remove storefront API client dependency ([807efd4](https://github.com/kiriminaja/shopify-app-nuxt/commit/807efd4))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.16

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.15...v0.0.16)

### 🩹 Fixes

- Pass apiVersion to GraphQL and Storefront clients in context creation ([0ce2173](https://github.com/kiriminaja/shopify-app-nuxt/commit/0ce2173))
- Update Admin API context to remove REST client references ([d700c03](https://github.com/kiriminaja/shopify-app-nuxt/commit/d700c03))
- Enhance type safety for admin and flow authentication contexts ([ad209be](https://github.com/kiriminaja/shopify-app-nuxt/commit/ad209be))
- Remove Storefront API context and related references since it already out-of-context of shopify apps ([3b4a1ff](https://github.com/kiriminaja/shopify-app-nuxt/commit/3b4a1ff))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.15

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.14...v0.0.15)

### 🚀 Enhancements

- Update AppHeaderLogo component and nuxt.config.ts for new branding chore: modify package.json and bun.lock for dependency updates ([53aefa1](https://github.com/kiriminaja/shopify-app-nuxt/commit/53aefa1))

### 🩹 Fixes

- Update npm publish command to include public access ([8d4b5ab](https://github.com/kiriminaja/shopify-app-nuxt/commit/8d4b5ab))
- Update package.json to remove nuxt-site-config and overrides ([7626d80](https://github.com/kiriminaja/shopify-app-nuxt/commit/7626d80))
- Update package.json description and add compatibility for Nuxt 3 ([9e4370b](https://github.com/kiriminaja/shopify-app-nuxt/commit/9e4370b))
- Update Nuxt compatibility version to ^4.0.0 in package.json ([987cebd](https://github.com/kiriminaja/shopify-app-nuxt/commit/987cebd))
- Remove Nuxt compatibility section from package.json ([f68e36e](https://github.com/kiriminaja/shopify-app-nuxt/commit/f68e36e))

### 💅 Refactors

- Rename module from shopify-nuxt to shopify-app-nuxt ([3a69b35](https://github.com/kiriminaja/shopify-app-nuxt/commit/3a69b35))

### 📖 Documentation

- Update README.md to simplify content and improve clarity ([8512b27](https://github.com/kiriminaja/shopify-app-nuxt/commit/8512b27))
- Add important note about package status in README.md ([93b98f3](https://github.com/kiriminaja/shopify-app-nuxt/commit/93b98f3))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.14

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.13...v0.0.14)

### 🚀 Enhancements

- Add comprehensive documentation for webhooks, App Bridge, and Polaris components ([8e5bf7e](https://github.com/kiriminaja/shopify-app-nuxt/commit/8e5bf7e))
- Add google site verification HTML file for SEO ([10fbd27](https://github.com/kiriminaja/shopify-app-nuxt/commit/10fbd27))

### 🩹 Fixes

- Remove incorrect module path in nuxt.config.ts ([11f6a46](https://github.com/kiriminaja/shopify-app-nuxt/commit/11f6a46))
- Update package name from shopify-app-nuxt to shopify-app-nuxt in README and module files ([ec2d14f](https://github.com/kiriminaja/shopify-app-nuxt/commit/ec2d14f))

### 💅 Refactors

- Code structure for improved readability and maintainability and add docs starter from docus ([a1b43ef](https://github.com/kiriminaja/shopify-app-nuxt/commit/a1b43ef))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.13

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.12...v0.0.13)

### 🚀 Enhancements

- Enhance useShopifyFetch to support query parameters and improve type safety ([02a6949](https://github.com/kiriminaja/shopify-app-nuxt/commit/02a6949))
- Enhance AdminContext and useShopifyAdmin to support generic JwtPayload type ([efde9ce](https://github.com/kiriminaja/shopify-app-nuxt/commit/efde9ce))

### 📖 Documentation

- Update README to clarify differences between shopify-app-nuxt and @nuxtjs/shopify ([52f8079](https://github.com/kiriminaja/shopify-app-nuxt/commit/52f8079))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.12

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.11...v0.0.12)

### 🚀 Enhancements

- Add Shopify API integration files and update h3 dependency to v2.0.0 ([c96c2ab](https://github.com/kiriminaja/shopify-app-nuxt/commit/c96c2ab))
- Enhance useShopifyFetch with server-side support and add tests for authorization header handling ([8091068](https://github.com/kiriminaja/shopify-app-nuxt/commit/8091068))

### 💅 Refactors

- Streamline useShopifyFetch function and remove redundant interface ([120c4c6](https://github.com/kiriminaja/shopify-app-nuxt/commit/120c4c6))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.11

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.10...v0.0.11)

### 🚀 Enhancements

- Add App Bridge UI components (ShUiModal, ShUiNavMenu, ShUiSaveBar, ShUiTitleBar) for enhanced Shopify integration ([b5bd90d](https://github.com/kiriminaja/shopify-app-nuxt/commit/b5bd90d))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.10

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.9...v0.0.10)

### 🚀 Enhancements

- Add ShLoadingIndicator component to manage loading state in Shopify app ([584cb98](https://github.com/kiriminaja/shopify-app-nuxt/commit/584cb98))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.9

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.8...v0.0.9)

### 💅 Refactors

- Enhance useShopifyFetch to support authorization headers and improve type definitions ([54431e5](https://github.com/kiriminaja/shopify-app-nuxt/commit/54431e5))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.8

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.7...v0.0.8)

### 🚀 Enhancements

- Add Nitro plugin to set Shopify-required response headers for document requests ([6f37605](https://github.com/kiriminaja/shopify-app-nuxt/commit/6f37605))

### 🩹 Fixes

- Remove TypeScript error suppression for auto-import in Shopify defaults plugin ([7b08195](https://github.com/kiriminaja/shopify-app-nuxt/commit/7b08195))

### 💅 Refactors

- Update meta tag handling in Nuxt module and improve CSP header test ([10171d4](https://github.com/kiriminaja/shopify-app-nuxt/commit/10171d4))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.7

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.6...v0.0.7)

### 🚀 Enhancements

- Simplify Vite server configuration to allow all Cloudflare tunnel hosts ([697f96d](https://github.com/kiriminaja/shopify-app-nuxt/commit/697f96d))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.6

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.5...v0.0.6)

### 🚀 Enhancements

- Allow Cloudflare tunnel hosts in Vite's dev server configuration ([1936f00](https://github.com/kiriminaja/shopify-app-nuxt/commit/1936f00))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.5

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.4...v0.0.5)

### 🚀 Enhancements

- Add support for Cloudflare in content security policy ([a82c1b9](https://github.com/kiriminaja/shopify-app-nuxt/commit/a82c1b9))

### 💅 Refactors

- Change error logging from console.error to console.debug in auth callback and token exchange ([9a61a5e](https://github.com/kiriminaja/shopify-app-nuxt/commit/9a61a5e))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.4

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.3...v0.0.4)

### 🚀 Enhancements

- Wrap NuxtPage in NuxtLayout and add id prop to ShModal component ([2d92492](https://github.com/kiriminaja/shopify-app-nuxt/commit/2d92492))
- Enhance ShModal component with additional slots and update usage examples in README ([789359d](https://github.com/kiriminaja/shopify-app-nuxt/commit/789359d))
- Add navigation links support in ShopifyAppProvider and update related documentation ([d93a38e](https://github.com/kiriminaja/shopify-app-nuxt/commit/d93a38e))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.3

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Integrate Shopify session storage and enhance API handling with new endpoints ([ba02f8c](https://github.com/kiriminaja/shopify-app-nuxt/commit/ba02f8c))
- Add default session storage plugin and enhance Shopify configuration handling ([ab7360a](https://github.com/kiriminaja/shopify-app-nuxt/commit/ab7360a))
- Enhance Shopify integration with session storage options and API context improvements ([453ccc8](https://github.com/kiriminaja/shopify-app-nuxt/commit/453ccc8))
- Implement Shopify authentication flow with custom login page and middleware enhancements ([c566d1d](https://github.com/kiriminaja/shopify-app-nuxt/commit/c566d1d))
- Add support for custom authentication page and enhance runtime config types ([ebae965](https://github.com/kiriminaja/shopify-app-nuxt/commit/ebae965))

### 🩹 Fixes

- Update repository field in package.json to correct owner ([ac03fcb](https://github.com/kiriminaja/shopify-app-nuxt/commit/ac03fcb))
- Correct variable name from 'payload' to '_payload' in webhook handler ([b66c4f8](https://github.com/kiriminaja/shopify-app-nuxt/commit/b66c4f8))

### 💅 Refactors

- Clean up code formatting and improve readability in helpers and tests ([e2243b4](https://github.com/kiriminaja/shopify-app-nuxt/commit/e2243b4))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.2

[compare changes](https://github.com/kiriminaja/shopify-app-nuxt/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- Enhance event handling in Polaris components with additional emitters ([8d5cb26](https://github.com/kiriminaja/shopify-app-nuxt/commit/8d5cb26))
- Update Polaris components to improve event handling and structure ([a9759e5](https://github.com/kiriminaja/shopify-app-nuxt/commit/a9759e5))
- Update form components to use v-model for better data binding ([97b1b9c](https://github.com/kiriminaja/shopify-app-nuxt/commit/97b1b9c))
- Refactor Polaris components to use usePolarisAttrs utility for attribute merging ([73f88b1](https://github.com/kiriminaja/shopify-app-nuxt/commit/73f88b1))

### 🩹 Fixes

- Update package name to include scope ([94227b3](https://github.com/kiriminaja/shopify-app-nuxt/commit/94227b3))
- Revert package name to original format ([99e8935](https://github.com/kiriminaja/shopify-app-nuxt/commit/99e8935))
- Ensure consistent value emission in form components ([4cfb40f](https://github.com/kiriminaja/shopify-app-nuxt/commit/4cfb40f))
- Correct button attribute order for consistency in app.vue ([c1ce550](https://github.com/kiriminaja/shopify-app-nuxt/commit/c1ce550))
- Update v-bind usage in Polaris components to include props for better attribute handling ([459a359](https://github.com/kiriminaja/shopify-app-nuxt/commit/459a359))
- Add h3 dependency and update useShopifyFetch for server-side compatibility ([694c281](https://github.com/kiriminaja/shopify-app-nuxt/commit/694c281))
- Enhance Shopify configuration for better environment variable handling and improve error handling in admin authentication ([e0068eb](https://github.com/kiriminaja/shopify-app-nuxt/commit/e0068eb))

### 💅 Refactors

- Remove unused ShopifyAppProvider component ([2934373](https://github.com/kiriminaja/shopify-app-nuxt/commit/2934373))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.1

### 🚀 Enhancements

- Update project preparation ([c8017d2](https://github.com/kiriminaja/shopify-app-nuxt/commit/c8017d2))
- Clone and adopt the component from shopify-app-react-router ([23bdf1b](https://github.com/kiriminaja/shopify-app-nuxt/commit/23bdf1b))
- Refactor Shopify API integration and improve App Bridge handling ([c821d83](https://github.com/kiriminaja/shopify-app-nuxt/commit/c821d83))
- Integrate Shopify App Bridge and update related composables ([0d29e99](https://github.com/kiriminaja/shopify-app-nuxt/commit/0d29e99))
- Update Shopify App Bridge integration to use app-bridge-types and improve type safety ([b2b44be](https://github.com/kiriminaja/shopify-app-nuxt/commit/b2b44be))
- Add Copilot instructions for shopify-app-nuxt module ([7505fdc](https://github.com/kiriminaja/shopify-app-nuxt/commit/7505fdc))
- Enhance README with comprehensive setup instructions and module features ([c4a7343](https://github.com/kiriminaja/shopify-app-nuxt/commit/c4a7343))
- Implement Shopify Nuxt Playground functionality and add CSP middleware improvements ([d64b820](https://github.com/kiriminaja/shopify-app-nuxt/commit/d64b820))
- Update content ([4fea0e1](https://github.com/kiriminaja/shopify-app-nuxt/commit/4fea0e1))
- Dev app is running by now ([b0a8ef5](https://github.com/kiriminaja/shopify-app-nuxt/commit/b0a8ef5))
- Add new Polaris components including ShBadge, ShBanner, ShBox, ShButton, ShButtonGroup, ShCheckbox, ShChip, ShChoice, ShChoiceList, ShClickable, ShClickableChip, ShColorField, ShColorPicker, ShDateField, ShDatePicker, ShDivider, ShDropZone, ShEmailField, ShGrid, ShGridItem, ShHeading, ShIcon, ShImage, ShLink, ShListItem, ShMenu, ShModal, ShMoneyField, ShNumberField, ShOption, ShOptionGroup, ShOrderedList, ShPage, ShParagraph, ShPasswordField, ShPopover, ShQueryContainer, ShSearchField, ShSection, ShSelect, ShSpinner, ShStack, ShSwitch, ShTable, ShTableBody, ShTableCell, ShTableHeader, ShTableHeaderRow, ShTableRow, ShText, ShTextArea, ShTextField, ShThumbnail, ShTooltip, ShUnorderedList, ShUrlField, and types definition for Polaris. ([b9f9dd5](https://github.com/kiriminaja/shopify-app-nuxt/commit/b9f9dd5))
- Add usage instructions for Polaris components with Vue wrappers ([229828c](https://github.com/kiriminaja/shopify-app-nuxt/commit/229828c))
- Add Polaris Vue wrapper components to features list in README ([385dcf3](https://github.com/kiriminaja/shopify-app-nuxt/commit/385dcf3))

### 🩹 Fixes

- Improve formatting in Copilot instructions for better readability ([13cea31](https://github.com/kiriminaja/shopify-app-nuxt/commit/13cea31))
- Update webhooks path and improve CSP middleware for better request handling ([1d4c9b4](https://github.com/kiriminaja/shopify-app-nuxt/commit/1d4c9b4))
- Npm and shopify configurations on dev ([52a12b7](https://github.com/kiriminaja/shopify-app-nuxt/commit/52a12b7))
- App-bridge is work by now ([14f7a45](https://github.com/kiriminaja/shopify-app-nuxt/commit/14f7a45))
- Shopify app bridge api communication work properly by now, tested by calling toast ([41e5fd5](https://github.com/kiriminaja/shopify-app-nuxt/commit/41e5fd5))
- Remove unused import from basic tests ([e5fed5f](https://github.com/kiriminaja/shopify-app-nuxt/commit/e5fed5f))

### 💅 Refactors

- Update features table formatting in README and remove CSP header test from basic tests ([18a7656](https://github.com/kiriminaja/shopify-app-nuxt/commit/18a7656))

### 🏡 Chore

- Migrate CI workflow to use Bun for dependency management and scripts ([fdae0e6](https://github.com/kiriminaja/shopify-app-nuxt/commit/fdae0e6))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))
