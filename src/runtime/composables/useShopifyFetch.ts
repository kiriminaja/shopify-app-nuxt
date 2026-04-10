import { useNuxtApp, useRequestEvent } from '#app'
import type { ShopifyGlobal } from '@shopify/app-bridge-types'
import type {
  NitroFetchRequest,
  TypedInternalResponse,
  AvailableRouterMethod
} from 'nitropack/types'
import type { RouterMethod } from 'h3'

type ShopifyFetchData<
  T,
  R extends NitroFetchRequest,
  M extends RouterMethod
> = [T] extends [undefined] ? TypedInternalResponse<R, unknown, M> : T

type QueryParams = Record<string, string | number | boolean | null | undefined>

export async function useShopifyFetch<
  T = undefined,
  R extends NitroFetchRequest = NitroFetchRequest,
  M extends AvailableRouterMethod<R> = 'get' extends AvailableRouterMethod<R>
    ? 'get'
    : AvailableRouterMethod<R>
>(
  url: R,
  options?: Omit<RequestInit, 'method'> & {
    method?: Uppercase<M> | M
    query?: QueryParams
  }
): Promise<{
  data: ShopifyFetchData<T, R, Extract<Lowercase<M>, RouterMethod>>
  response: Response
}>
export async function useShopifyFetch(
  url: NitroFetchRequest,
  options?: RequestInit & {
    method?: RouterMethod | Uppercase<RouterMethod>
    query?: QueryParams
  }
): Promise<{ data: unknown; response: Response }> {
  const { query, ...opts } = options ?? {}

  if (import.meta.server) {
    const event = useRequestEvent()
    const headers: Record<string, string> = {}

    // Forward the Authorization header from the incoming request
    const authHeader = event?.headers.get('authorization')
    if (authHeader) {
      headers['Authorization'] = authHeader
    }

    if (opts.headers) {
      const incoming = new Headers(opts.headers)
      incoming.forEach((value, key) => {
        headers[key] = value
      })
    }

    const { method, ...rest } = opts

    const fetchResponse = await globalThis.$fetch.raw(url, {
      ...rest,
      method,
      headers,
      query
    })

    return { data: fetchResponse._data, response: fetchResponse }
  }

  const nuxtApp = useNuxtApp()
  const shopify = nuxtApp.$shopify as ShopifyGlobal | undefined

  if (!shopify) {
    throw new Error(
      'Shopify App Bridge is not available. Make sure the app is loaded within the Shopify Admin.'
    )
  }

  const token = await shopify.idToken()

  const headers = new Headers(opts.headers || {})
  headers.set('Authorization', `Bearer ${token}`)

  let resolvedUrl = url as string
  if (query) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      if (value !== null && value !== undefined) {
        params.set(key, String(value))
      }
    }
    const qs = params.toString()
    if (qs) resolvedUrl += (resolvedUrl.includes('?') ? '&' : '?') + qs
  }

  const fetchResponse = await fetch(resolvedUrl, {
    ...opts,
    headers
  })

  if (!fetchResponse.ok) {
    const errorBody = await fetchResponse.text().catch(() => '')
    throw new Error(
      `Shopify fetch failed: ${fetchResponse.status} ${fetchResponse.statusText} ${errorBody}`.trim()
    )
  }

  const contentType = fetchResponse.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return { data: await fetchResponse.json(), response: fetchResponse }
  }

  return { data: await fetchResponse.text(), response: fetchResponse }
}
