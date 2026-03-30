import { defineNuxtRouteMiddleware, useRuntimeConfig } from '#app'
import { navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig().public.shopify

  const authPage = config.authPagePath || '/auth'
  // On the server, check if the request has the required Shopify query params.
  // Shopify always adds `shop` and `host` when loading an embedded app.
  if (import.meta.server) {
    const shop = to.query.shop as string | undefined
    if (!shop) {
      return navigateTo(authPage)
    }
    return
  }

  // On the client, check if App Bridge is available and has a shop configured.
  const shop = window.shopify?.config?.shop

  if (!shop) {
    return navigateTo(authPage)
  }
})
