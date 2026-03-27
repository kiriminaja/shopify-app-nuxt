import { defineNuxtRouteMiddleware } from '#app'
import { navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware(() => {
  // Check if we can fetch the shop from app bridge, if not, redirect to auth route.
  // This is a simple check to see if the app bridge is working and the shop is available.
  // In a real app, you might want to check for a valid session or token instead.
  if (import.meta.server || typeof window === 'undefined') {
    return
  }

  const shop = window.shopify?.config?.shop

  if (!shop) {
    return navigateTo('/auth')
  }
})
