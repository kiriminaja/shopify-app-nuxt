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

interface ShopifyFetchFunction {
  <
    T = undefined,
    R extends NitroFetchRequest = NitroFetchRequest,
    M extends AvailableRouterMethod<R> = 'get' extends AvailableRouterMethod<R>
      ? 'get'
      : AvailableRouterMethod<R>
  >(
    url: R,
    options?: Omit<RequestInit, 'method'> & { method?: Uppercase<M> | M }
  ): Promise<{
    data: ShopifyFetchData<T, R, Extract<Lowercase<M>, RouterMethod>>
    response: Response
  }>
}

export function useShopifyFetch(): ShopifyFetchFunction {
  if (import.meta.server) {
    const event = useRequestEvent()

    return (async (url: string, options: RequestInit = {}) => {
      const headers: Record<string, string> = {}

      // Forward the Authorization header from the incoming request
      const authHeader = event?.headers.get('authorization')
      if (authHeader) {
        headers['Authorization'] = authHeader
      }

      if (options.headers) {
        const incoming = new Headers(options.headers)
        incoming.forEach((value, key) => {
          headers[key] = value
        })
      }

      const { method, ...rest } = options as RequestInit & { method?: string }

      const response = await globalThis.$fetch.raw(url, {
        ...rest,
        method: method as any,
        headers
      })

      return { data: response._data, response: response as unknown as Response }
    }) as unknown as ShopifyFetchFunction
  }

  const nuxtApp = useNuxtApp()

  return (async (url: string, options: RequestInit = {}) => {
    const shopify = nuxtApp.$shopify as ShopifyGlobal | undefined

    if (!shopify) {
      throw new Error(
        'Shopify App Bridge is not available. Make sure the app is loaded within the Shopify Admin.'
      )
    }

    const token = await shopify.idToken()

    const headers = new Headers(options.headers || {})
    headers.set('Authorization', `Bearer ${token}`)

    const response = await fetch(url, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(
        `Shopify fetch failed: ${response.status} ${response.statusText}`
      )
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return { data: await response.json(), response }
    }

    return { data: await response.text(), response }
  }) as unknown as ShopifyFetchFunction
}
