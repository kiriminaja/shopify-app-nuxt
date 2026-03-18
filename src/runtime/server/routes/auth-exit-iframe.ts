import { defineEventHandler, getQuery, setResponseHeader } from 'h3'
import { getResolvedConfig } from '../services/shopify'
import { renderAppBridgePage } from '../utils/helpers'

/**
 * Render the exit-iframe page.
 * This page uses App Bridge to redirect the user out of the auth iframe.
 */
export default defineEventHandler(async (event) => {
  const config = getResolvedConfig()
  const query = getQuery(event)
  const destination = (query.exitIframe as string) || config.appUrl

  const html = renderAppBridgePage(config.apiKey, config.appUrl, destination)
  setResponseHeader(event, 'content-type', 'text/html')
  return html
})
