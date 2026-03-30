import { defineNitroPlugin } from 'nitropack/runtime'
import { getQuery, setResponseHeader } from 'h3'

const APP_BRIDGE_URL = 'https://cdn.shopify.com/shopifycloud/app-bridge.js'
const POLARIS_URL = 'https://cdn.shopify.com/shopifycloud/polaris.js'
const CDN_URL = 'https://cdn.shopify.com'

/**
 * Nitro plugin that adds Shopify-required response headers to every document request.
 *
 * Mirrors the behaviour of Shopify's official `addDocumentResponseHeaders`:
 * - `Content-Security-Policy`: frame-ancestors scoped to the requesting shop
 * - `Link`: preconnect / preload hints for App Bridge + Polaris CDN assets
 *
 * @see https://github.com/Shopify/shopify-app-js/blob/main/packages/apps/shopify-app-react-router/src/server/authenticate/helpers/add-response-headers.ts
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const query = getQuery(event)
    const shop = typeof query.shop === 'string' ? query.shop : undefined

    // Link header — preconnect to CDN + preload App Bridge & Polaris scripts
    if (shop) {
      setResponseHeader(
        event,
        'Link',
        `<${CDN_URL}>; rel="preconnect", <${APP_BRIDGE_URL}>; rel="preload"; as="script", <${POLARIS_URL}>; rel="preload"; as="script"`
      )
    }

    // Content-Security-Policy — scope frame-ancestors to the requesting shop
    if (shop) {
      setResponseHeader(
        event,
        'Content-Security-Policy',
        `frame-ancestors https://${shop} https://admin.shopify.com https://*.spin.dev https://admin.myshopify.io https://admin.shop.dev;`
      )
    } else {
      setResponseHeader(
        event,
        'Content-Security-Policy',
        `frame-ancestors https://*.myshopify.com https://admin.shopify.com https://*.spin.dev https://admin.myshopify.io https://admin.shop.dev;`
      )
    }
  })
})
