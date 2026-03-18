export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  shopify: {
    apiKey: process.env.SHOPIFY_API_KEY || 'test-api-key',
    apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY || 'test-api-secret',
    scopes: ['read_products', 'write_products'],
    appUrl: process.env.SHOPIFY_APP_URL || 'https://localhost:3000'
  }
})
