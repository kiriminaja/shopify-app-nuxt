import type { Session } from '@shopify/shopify-api'

/**
 * Test helper that returns a mock configuration for testing.
 *
 * ```ts
 * import { testConfig } from 'shopify-nuxt/test-helpers'
 *
 * const config = testConfig()
 * // Use in your test setup
 * ```
 */
export function testConfig(overrides?: Record<string, any>) {
  return {
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret-key',
    scopes: ['read_products'],
    appUrl: 'https://test-app.example.com',
    apiVersion: '2025-01',
    authPathPrefix: '/_shopify/auth',
    distribution: 'app_store',
    useOnlineTokens: false,
    ...overrides
  }
}

/**
 * Create a mock session for testing.
 */
export function testSession(overrides?: Partial<Session>): any {
  return {
    id: 'offline_test-shop.myshopify.com',
    shop: 'test-shop.myshopify.com',
    state: 'active',
    isOnline: false,
    accessToken: 'test-access-token',
    scope: 'read_products',
    isActive: () => true,
    ...overrides
  }
}
