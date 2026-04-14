export default defineAppConfig({
  seo: {
    description:
      'Easily integrate Shopify into your Nuxt 3 & 4 app. Build powerful e-commerce applications with Nuxt Shopify.'
  },

  socials: {
    x: 'https://go.nuxt.com/x',
    discord: 'https://go.nuxt.com/discord',
    shopify: 'https://shopify.dev/docs',
    nuxt: 'https://nuxt.com'
  },

  github: {
    rootDir: 'docs'
  },

  ui: {
    colors: {
      primary: 'primary',
      neutral: 'zinc'
    },
    pageHero: {
      slots: {
        title:
          'text-5xl sm:text-5xl text-pretty tracking-tight font-bold text-highlighted'
      }
    }
  }
})
