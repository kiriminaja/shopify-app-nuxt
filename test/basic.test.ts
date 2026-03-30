import { createHmac } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, url } from '@nuxt/test-utils/e2e'

const TEST_API_KEY = 'test-api-key'
const TEST_API_SECRET = 'test-api-secret'
const TEST_APP_URL = 'https://test.example.com'
const TEST_SHOP = 'test-shop.myshopify.com'

function computeHmac(body: string, secret: string = TEST_API_SECRET): string {
  return createHmac('sha256', secret).update(body, 'utf8').digest('base64')
}

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

describe('shopify-nuxt module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url))
  })

  // ─── Module Setup & SSR Head Tags ──────────────────────────────────

  describe('module setup', () => {
    it('renders the index page', async () => {
      const html = await $fetch('/')
      expect(html).toContain('basic')
    })

    it('includes shopify-api-key meta tag with configured key', async () => {
      const html = await $fetch('/')
      expect(html).toContain('shopify-api-key')
      expect(html).toContain(TEST_API_KEY)
    })

    it('includes App Bridge CDN script', async () => {
      const html = await $fetch('/')
      expect(html).toContain('cdn.shopify.com/shopifycloud/app-bridge.js')
    })

    it('includes Polaris CDN script', async () => {
      const html = await $fetch('/')
      expect(html).toContain('cdn.shopify.com/shopifycloud/polaris')
    })

    it('includes CSP frame-ancestors header', async () => {
      const res = await fetch(url('/'))
      const csp = res.headers.get('content-security-policy')
      expect(csp).toContain('frame-ancestors')
    })
  })

  // ─── OAuth Routes ──────────────────────────────────────────────────

  describe('OAuth routes', () => {
    it('GET /_shopify/auth returns non-404', async () => {
      try {
        await $fetch('/_shopify/auth?shop=test.myshopify.com')
      } catch (e: any) {
        expect(e.statusCode || e.status).not.toBe(404)
      }
    })

    it('GET /_shopify/auth returns 400 without shop param', async () => {
      try {
        await $fetch('/_shopify/auth')
        expect.unreachable('Should have thrown')
      } catch (e: any) {
        expect(e.statusCode).toBe(400)
      }
    })

    it('GET /_shopify/auth/callback returns non-404', async () => {
      try {
        await $fetch('/_shopify/auth/callback')
      } catch (e: any) {
        expect(e.statusCode || e.status).not.toBe(404)
      }
    })

    it('GET /_shopify/auth/exit-iframe returns HTML page', async () => {
      const html = await $fetch('/_shopify/auth/exit-iframe')
      expect(html).toContain('<!DOCTYPE html>')
      expect(html).toContain('shopify-api-key')
      expect(html).toContain(TEST_API_KEY)
      expect(html).toContain('cdn.shopify.com/shopifycloud/app-bridge.js')
    })

    it('GET /_shopify/auth/exit-iframe includes redirect destination', async () => {
      const dest = 'https://example.com/redirect'
      const html = await $fetch(
        `/_shopify/auth/exit-iframe?exitIframe=${encodeURIComponent(dest)}`
      )
      expect(html).toContain(dest)
      expect(html).toContain('window.open')
    })

    it('GET /_shopify/auth/exit-iframe falls back to appUrl', async () => {
      const html = await $fetch('/_shopify/auth/exit-iframe')
      expect(html).toContain(TEST_APP_URL)
    })

    it('GET /_shopify/auth/session-token returns HTML bounce page', async () => {
      const html = await $fetch('/_shopify/auth/session-token')
      expect(html).toContain('<!DOCTYPE html>')
      expect(html).toContain('shopify-api-key')
      expect(html).toContain(TEST_API_KEY)
      expect(html).toContain('shopify.idToken')
      expect(html).toContain('id_token')
    })
  })

  // ─── Webhook Authentication ────────────────────────────────────────

  describe('webhook authentication', () => {
    const webhookPath = '/api/webhooks'
    const validBody = JSON.stringify({ id: 123, title: 'Test Product' })
    const validHmac = computeHmac(validBody)

    it('rejects GET requests with 405', async () => {
      try {
        await $fetch(webhookPath, { method: 'GET' })
        expect.unreachable('Should have thrown')
      } catch (e: any) {
        expect(e.statusCode).toBe(405)
      }
    })

    it('rejects POST without required headers with 400', async () => {
      try {
        await $fetch(webhookPath, {
          method: 'POST',
          body: validBody,
          headers: { 'content-type': 'application/json' }
        })
        expect.unreachable('Should have thrown')
      } catch (e: any) {
        expect(e.statusCode).toBe(400)
      }
    })

    it('rejects POST with missing topic header', async () => {
      try {
        await $fetch(webhookPath, {
          method: 'POST',
          body: validBody,
          headers: {
            'content-type': 'application/json',
            'x-shopify-shop-domain': TEST_SHOP,
            'x-shopify-hmac-sha256': validHmac
          }
        })
        expect.unreachable('Should have thrown')
      } catch (e: any) {
        expect(e.statusCode).toBe(400)
      }
    })

    it('rejects POST with invalid HMAC with 401', async () => {
      try {
        await $fetch(webhookPath, {
          method: 'POST',
          body: validBody,
          headers: {
            'content-type': 'application/json',
            'x-shopify-topic': 'products/create',
            'x-shopify-shop-domain': TEST_SHOP,
            'x-shopify-hmac-sha256': 'invalid-hmac-value'
          }
        })
        expect.unreachable('Should have thrown')
      } catch (e: any) {
        expect(e.statusCode).toBe(401)
      }
    })

    it('accepts POST with valid HMAC and headers', async () => {
      const response = await $fetch(webhookPath, {
        method: 'POST',
        body: validBody,
        headers: {
          'content-type': 'application/json',
          'x-shopify-topic': 'products/create',
          'x-shopify-shop-domain': TEST_SHOP,
          'x-shopify-hmac-sha256': validHmac
        }
      })
      expect(response).toBeDefined()
    })
  })

  // ─── Admin Authentication ──────────────────────────────────────────

  describe('admin authentication', () => {
    it('returns 400 or 401 without session token', async () => {
      try {
        await $fetch('/api/shop', {
          headers: { 'user-agent': BROWSER_UA }
        })
        expect.unreachable('Should have thrown')
      } catch (e: any) {
        // 400 (missing shop) or 401 (no token)
        expect([400, 401]).toContain(e.statusCode)
      }
    })

    it('returns 410 for bot user-agents', async () => {
      try {
        await $fetch('/api/shop?shop=test.myshopify.com', {
          headers: {
            'user-agent':
              'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
          }
        })
        expect.unreachable('Should have thrown')
      } catch (e: any) {
        expect(e.statusCode).toBe(410)
      }
    })

    it('rejects invalid session token', async () => {
      try {
        await $fetch('/api/shop', {
          headers: {
            'user-agent': BROWSER_UA,
            authorization: 'Bearer invalid-token'
          }
        })
        expect.unreachable('Should have thrown')
      } catch (e: any) {
        // Invalid JWT → 500 (decode fails)
        expect([401, 500]).toContain(e.statusCode)
      }
    })
  })
})
