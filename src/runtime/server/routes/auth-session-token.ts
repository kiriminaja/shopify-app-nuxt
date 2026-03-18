import { defineEventHandler, setResponseHeader } from 'h3'
import { getResolvedConfig } from '../services/shopify'

/**
 * Render the session token bounce page.
 * For embedded apps, this page loads App Bridge which provides a session token
 * via a search param, then redirects back to the original request.
 */
export default defineEventHandler(async (event) => {
  const config = getResolvedConfig()

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="shopify-api-key" content="${config.apiKey}" />
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
  </head>
  <body>
    <script>
      if (window.shopify && window.shopify.idToken) {
        window.shopify.idToken().then(function(token) {
          var url = new URL(window.location.href);
          url.searchParams.set('id_token', token);
          url.pathname = '/';
          window.location.href = url.toString();
        });
      }
    </script>
  </body>
</html>`

  setResponseHeader(event, 'content-type', 'text/html')
  return html
})
