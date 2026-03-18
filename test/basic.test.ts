import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, url } from '@nuxt/test-utils/e2e'

describe('shopify-nuxt module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url))
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('basic')
  })

  it('includes shopify-api-key meta tag', async () => {
    const html = await $fetch('/')
    expect(html).toContain('shopify-api-key')
  })

  it('includes App Bridge script', async () => {
    const html = await $fetch('/')
    expect(html).toContain('cdn.shopify.com/shopifycloud/app-bridge.js')
  })

  it('includes CSP frame-ancestors header', async () => {
    const response = await fetch(url('/'), {
      headers: { accept: 'text/html' }
    })
    const csp = response.headers.get('content-security-policy')
    expect(csp).toContain('frame-ancestors')
    expect(csp).toContain('admin.shopify.com')
  })

  it('has auth route', async () => {
    try {
      await $fetch('/_shopify/auth?shop=test.myshopify.com')
    } catch (e: any) {
      // Expected to fail without valid Shopify credentials,
      // but the route should exist (not 404)
      expect(e.statusCode || e.status).not.toBe(404)
    }
  })
})
