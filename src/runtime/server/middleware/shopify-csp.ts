import { defineEventHandler, getHeader, getQuery, setResponseHeader } from 'h3'

/**
 * Server middleware that adds Content-Security-Policy headers for Shopify embedded apps.
 * This allows the app to be loaded inside a Shopify admin iframe.
 */
export default defineEventHandler((event) => {
  // Only add CSP headers for HTML document requests
  const accept = getHeader(event, 'accept') || ''

  if (!accept.includes('text/html')) {
    return
  }

  // frame-ancestors allows Shopify admin to embed the app
  const query = getQuery(event)
  const shop = query.shop as string | undefined
  const frameAncestors = [
    'https://admin.shopify.com',
    'https://*.myshopify.com'
  ]

  if (shop) {
    frameAncestors.push(`https://${shop}`)
  }

  setResponseHeader(
    event,
    'content-security-policy',
    `frame-ancestors ${frameAncestors.join(' ')};`
  )
})
