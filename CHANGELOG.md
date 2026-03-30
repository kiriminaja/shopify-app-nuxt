# Changelog

## v0.0.6

[compare changes](https://github.com/kiriminaja/shopify-nuxt/compare/v0.0.5...v0.0.6)

### 🚀 Enhancements

- Allow Cloudflare tunnel hosts in Vite's dev server configuration ([1936f00](https://github.com/kiriminaja/shopify-nuxt/commit/1936f00))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.5

[compare changes](https://github.com/kiriminaja/shopify-nuxt/compare/v0.0.4...v0.0.5)

### 🚀 Enhancements

- Add support for Cloudflare in content security policy ([a82c1b9](https://github.com/kiriminaja/shopify-nuxt/commit/a82c1b9))

### 💅 Refactors

- Change error logging from console.error to console.debug in auth callback and token exchange ([9a61a5e](https://github.com/kiriminaja/shopify-nuxt/commit/9a61a5e))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.4

[compare changes](https://github.com/kiriminaja/shopify-nuxt/compare/v0.0.3...v0.0.4)

### 🚀 Enhancements

- Wrap NuxtPage in NuxtLayout and add id prop to ShModal component ([2d92492](https://github.com/kiriminaja/shopify-nuxt/commit/2d92492))
- Enhance ShModal component with additional slots and update usage examples in README ([789359d](https://github.com/kiriminaja/shopify-nuxt/commit/789359d))
- Add navigation links support in ShopifyAppProvider and update related documentation ([d93a38e](https://github.com/kiriminaja/shopify-nuxt/commit/d93a38e))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.3

[compare changes](https://github.com/kiriminaja/shopify-nuxt/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Integrate Shopify session storage and enhance API handling with new endpoints ([ba02f8c](https://github.com/kiriminaja/shopify-nuxt/commit/ba02f8c))
- Add default session storage plugin and enhance Shopify configuration handling ([ab7360a](https://github.com/kiriminaja/shopify-nuxt/commit/ab7360a))
- Enhance Shopify integration with session storage options and API context improvements ([453ccc8](https://github.com/kiriminaja/shopify-nuxt/commit/453ccc8))
- Implement Shopify authentication flow with custom login page and middleware enhancements ([c566d1d](https://github.com/kiriminaja/shopify-nuxt/commit/c566d1d))
- Add support for custom authentication page and enhance runtime config types ([ebae965](https://github.com/kiriminaja/shopify-nuxt/commit/ebae965))

### 🩹 Fixes

- Update repository field in package.json to correct owner ([ac03fcb](https://github.com/kiriminaja/shopify-nuxt/commit/ac03fcb))
- Correct variable name from 'payload' to '_payload' in webhook handler ([b66c4f8](https://github.com/kiriminaja/shopify-nuxt/commit/b66c4f8))

### 💅 Refactors

- Clean up code formatting and improve readability in helpers and tests ([e2243b4](https://github.com/kiriminaja/shopify-nuxt/commit/e2243b4))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.2

[compare changes](https://github.com/kiriminaja/shopify-nuxt/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- Enhance event handling in Polaris components with additional emitters ([8d5cb26](https://github.com/kiriminaja/shopify-nuxt/commit/8d5cb26))
- Update Polaris components to improve event handling and structure ([a9759e5](https://github.com/kiriminaja/shopify-nuxt/commit/a9759e5))
- Update form components to use v-model for better data binding ([97b1b9c](https://github.com/kiriminaja/shopify-nuxt/commit/97b1b9c))
- Refactor Polaris components to use usePolarisAttrs utility for attribute merging ([73f88b1](https://github.com/kiriminaja/shopify-nuxt/commit/73f88b1))

### 🩹 Fixes

- Update package name to include scope ([94227b3](https://github.com/kiriminaja/shopify-nuxt/commit/94227b3))
- Revert package name to original format ([99e8935](https://github.com/kiriminaja/shopify-nuxt/commit/99e8935))
- Ensure consistent value emission in form components ([4cfb40f](https://github.com/kiriminaja/shopify-nuxt/commit/4cfb40f))
- Correct button attribute order for consistency in app.vue ([c1ce550](https://github.com/kiriminaja/shopify-nuxt/commit/c1ce550))
- Update v-bind usage in Polaris components to include props for better attribute handling ([459a359](https://github.com/kiriminaja/shopify-nuxt/commit/459a359))
- Add h3 dependency and update useShopifyFetch for server-side compatibility ([694c281](https://github.com/kiriminaja/shopify-nuxt/commit/694c281))
- Enhance Shopify configuration for better environment variable handling and improve error handling in admin authentication ([e0068eb](https://github.com/kiriminaja/shopify-nuxt/commit/e0068eb))

### 💅 Refactors

- Remove unused ShopifyAppProvider component ([2934373](https://github.com/kiriminaja/shopify-nuxt/commit/2934373))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))

## v0.0.1

### 🚀 Enhancements

- Update project preparation ([c8017d2](https://github.com/kiriminaja/shopify-nuxt/commit/c8017d2))
- Clone and adopt the component from shopify-app-react-router ([23bdf1b](https://github.com/kiriminaja/shopify-nuxt/commit/23bdf1b))
- Refactor Shopify API integration and improve App Bridge handling ([c821d83](https://github.com/kiriminaja/shopify-nuxt/commit/c821d83))
- Integrate Shopify App Bridge and update related composables ([0d29e99](https://github.com/kiriminaja/shopify-nuxt/commit/0d29e99))
- Update Shopify App Bridge integration to use app-bridge-types and improve type safety ([b2b44be](https://github.com/kiriminaja/shopify-nuxt/commit/b2b44be))
- Add Copilot instructions for shopify-nuxt module ([7505fdc](https://github.com/kiriminaja/shopify-nuxt/commit/7505fdc))
- Enhance README with comprehensive setup instructions and module features ([c4a7343](https://github.com/kiriminaja/shopify-nuxt/commit/c4a7343))
- Implement Shopify Nuxt Playground functionality and add CSP middleware improvements ([d64b820](https://github.com/kiriminaja/shopify-nuxt/commit/d64b820))
- Update content ([4fea0e1](https://github.com/kiriminaja/shopify-nuxt/commit/4fea0e1))
- Dev app is running by now ([b0a8ef5](https://github.com/kiriminaja/shopify-nuxt/commit/b0a8ef5))
- Add new Polaris components including ShBadge, ShBanner, ShBox, ShButton, ShButtonGroup, ShCheckbox, ShChip, ShChoice, ShChoiceList, ShClickable, ShClickableChip, ShColorField, ShColorPicker, ShDateField, ShDatePicker, ShDivider, ShDropZone, ShEmailField, ShGrid, ShGridItem, ShHeading, ShIcon, ShImage, ShLink, ShListItem, ShMenu, ShModal, ShMoneyField, ShNumberField, ShOption, ShOptionGroup, ShOrderedList, ShPage, ShParagraph, ShPasswordField, ShPopover, ShQueryContainer, ShSearchField, ShSection, ShSelect, ShSpinner, ShStack, ShSwitch, ShTable, ShTableBody, ShTableCell, ShTableHeader, ShTableHeaderRow, ShTableRow, ShText, ShTextArea, ShTextField, ShThumbnail, ShTooltip, ShUnorderedList, ShUrlField, and types definition for Polaris. ([b9f9dd5](https://github.com/kiriminaja/shopify-nuxt/commit/b9f9dd5))
- Add usage instructions for Polaris components with Vue wrappers ([229828c](https://github.com/kiriminaja/shopify-nuxt/commit/229828c))
- Add Polaris Vue wrapper components to features list in README ([385dcf3](https://github.com/kiriminaja/shopify-nuxt/commit/385dcf3))

### 🩹 Fixes

- Improve formatting in Copilot instructions for better readability ([13cea31](https://github.com/kiriminaja/shopify-nuxt/commit/13cea31))
- Update webhooks path and improve CSP middleware for better request handling ([1d4c9b4](https://github.com/kiriminaja/shopify-nuxt/commit/1d4c9b4))
- Npm and shopify configurations on dev ([52a12b7](https://github.com/kiriminaja/shopify-nuxt/commit/52a12b7))
- App-bridge is work by now ([14f7a45](https://github.com/kiriminaja/shopify-nuxt/commit/14f7a45))
- Shopify app bridge api communication work properly by now, tested by calling toast ([41e5fd5](https://github.com/kiriminaja/shopify-nuxt/commit/41e5fd5))
- Remove unused import from basic tests ([e5fed5f](https://github.com/kiriminaja/shopify-nuxt/commit/e5fed5f))

### 💅 Refactors

- Update features table formatting in README and remove CSP header test from basic tests ([18a7656](https://github.com/kiriminaja/shopify-nuxt/commit/18a7656))

### 🏡 Chore

- Migrate CI workflow to use Bun for dependency management and scripts ([fdae0e6](https://github.com/kiriminaja/shopify-nuxt/commit/fdae0e6))

### ❤️ Contributors

- Yanuar Aditia ([@ngalor](https://github.com/ngalor))
