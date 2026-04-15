export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  vite: {
    server: {
      allowedHosts: ['*.trycloudflare.com']
    }
  },
  shopify: {
    apiKey: process.env.SHOPIFY_API_KEY || 'test-api-key',
    apiSecretKey:
      process.env.SHOPIFY_API_SECRET ||
      process.env.SHOPIFY_API_SECRET_KEY ||
      'test-api-secret',
    appUrl:
      process.env.SHOPIFY_APP_URL ||
      process.env.HOST ||
      'https://localhost:3000',
    navLinks: [
      { label: 'Home', href: '/', rel: 'home' },
      { label: 'Products', href: '/products' },
      { label: 'Settings', href: '/settings' }
    ],
    codegen: true
  }
})
