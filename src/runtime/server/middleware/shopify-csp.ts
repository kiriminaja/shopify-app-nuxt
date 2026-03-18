import { defineEventHandler, getRequestURL } from 'h3'

/**
 * Server middleware that adds Content-Security-Policy headers for Shopify embedded apps.
 * This allows the app to be loaded inside a Shopify admin iframe.
 */
export default defineEventHandler((event) => {
  // Only add CSP headers for HTML document requests
  const accept = event.req.headers.get('accept') || ''
  if (!accept.includes('text/html')) {
    return
  }

  // frame-ancestors allows Shopify admin to embed the app
  const shop = new URL(getRequestURL(event)).searchParams.get('shop')
  const frameAncestors = [
    'https://admin.shopify.com',
    'https://*.myshopify.com'
  ]

  if (shop) {
    frameAncestors.push(`https://${shop}`)
  }

  event.res.headers.set(
    'content-security-policy',
    `frame-ancestors ${frameAncestors.join(' ')};`
  )
})
