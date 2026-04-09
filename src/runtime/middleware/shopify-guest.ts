import { defineNuxtRouteMiddleware, useCookie } from '#app'
import { navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware(() => {
  const redirectTo = useCookie('shopify-redirect-to')

  // On the server, check if the request has the required Shopify query params.
  if (import.meta.server) {
    // Not authenticated — stay on the login page
    return
  }

  // On the client, check if App Bridge is available and has a shop configured.
  const shop = window.shopify?.config?.shop

  if (shop) {
    // Already authenticated — redirect to the stored target URL or home
    const target = redirectTo.value || '/'
    redirectTo.value = null
    return navigateTo(target)
  }
})
