import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  shopify: {
    apiKey: 'test-api-key',
    apiSecretKey: 'test-api-secret',
    scopes: ['read_products'],
    appUrl: 'https://test.example.com'
  }
})
