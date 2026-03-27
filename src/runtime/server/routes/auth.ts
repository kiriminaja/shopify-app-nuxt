import { defineEventHandler, getQuery, sendRedirect, createError } from 'h3'
import { getShopifyApi, getResolvedConfig } from '../services/shopify'

/**
 * Handle the initial auth request.
 * For token exchange flow (embedded apps), this redirects to Shopify OAuth.
 */
export default defineEventHandler(async (event) => {
  const api = getShopifyApi()
  const config = getResolvedConfig()
  const query = getQuery(event)
  const shop = query.shop as string

  if (!shop) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing shop parameter'
    })
  }

  // For embedded apps using token exchange, begin OAuth
  const callbackUrl = `${config.appUrl}${config.auth.callbackPath}`

  const authUrl = await api.auth.begin({
    shop,
    callbackPath: callbackUrl,
    isOnline: false,
    rawRequest: event.req,
    rawResponse: event.res
  })

  return sendRedirect(event, authUrl)
})
