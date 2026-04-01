import type { Session, Shopify, ApiVersion } from '@shopify/shopify-api'
import type {
  AdminOperations,
  AllOperations,
  ApiClientRequestOptions,
  ReturnData,
  FetchResponseBody,
  ResponseWithType
} from '@shopify/admin-api-client'
import type { StorefrontOperations } from '@shopify/storefront-api-client'

// ─── GraphQL Client Types ────────────────────────────────────────────────────

export interface GraphQLQueryOptions<
  Operation extends keyof Operations,
  Operations extends AllOperations
> {
  /** The variables to pass to the operation. */
  variables?: ApiClientRequestOptions<Operation, Operations>['variables']
  /** The version of the API to use for the request. */
  apiVersion?: ApiVersion
  /** Additional headers to include in the request. */
  headers?: Record<string, string>
  /** The total number of times to try the request if it fails. */
  tries?: number
  /** An optional AbortSignal to cancel the request. */
  signal?: AbortSignal
}

export type GraphQLResponse<
  Operation extends keyof Operations,
  Operations extends AllOperations
> = ResponseWithType<FetchResponseBody<ReturnData<Operation, Operations>>>

export type GraphQLClient<Operations extends AllOperations> = <
  Operation extends keyof Operations
>(
  query: Operation,
  options?: GraphQLQueryOptions<Operation, Operations>
) => Promise<GraphQLResponse<Operation, Operations>>

// ─── Admin API Context ───────────────────────────────────────────────────────

export interface AdminApiContext {
  /** Make a typed GraphQL request to the Shopify Admin API */
  graphql: GraphQLClient<AdminOperations>
  /** Make a REST request to the Shopify Admin API */
  rest: {
    get: (params: { path: string }) => Promise<any>
    post: (params: { path: string; data?: any }) => Promise<any>
    put: (params: { path: string; data?: any }) => Promise<any>
    delete: (params: { path: string }) => Promise<any>
  }
}

// ─── Storefront API Context ─────────────────────────────────────────────────

export interface StorefrontApiContext {
  /** Make a typed GraphQL request to the Shopify Storefront API */
  graphql: GraphQLClient<StorefrontOperations>
}

// ─── Factories ──────────────────────────────────────────────────────────────

export function createAdminApiContext(
  api: Shopify,
  session: Session,
  onError?: (error: any) => void
): AdminApiContext {
  const graphql: GraphQLClient<AdminOperations> = async (query, options) => {
    const client = new api.clients.Graphql({
      session,
      apiVersion: options?.apiVersion
    })
    try {
      const response = await client.request(query as string, {
        variables: options?.variables as Record<string, unknown>,
        retries: options?.tries,
        headers: options?.headers
      })
      return new Response(JSON.stringify(response)) as any
    } catch (error) {
      if (onError) onError(error)
      throw error
    }
  }

  const restRequest = async (
    method: string,
    params: { path: string; data?: any }
  ) => {
    const client = new api.clients.Rest({ session })
    try {
      const response = await (client as any)[method.toLowerCase()]({
        path: params.path,
        data: params.data
      })
      return response
    } catch (error) {
      if (onError) onError(error)
      throw error
    }
  }

  return {
    graphql,
    rest: {
      get: (params) => restRequest('get', params),
      post: (params) => restRequest('post', params),
      put: (params) => restRequest('put', params),
      delete: (params) => restRequest('delete', params)
    }
  }
}

export function createStorefrontApiContext(
  api: Shopify,
  session: Session,
  onError?: (error: any) => void
): StorefrontApiContext {
  const graphql: GraphQLClient<StorefrontOperations> = async (
    query,
    options
  ) => {
    const client = new api.clients.Storefront({
      session,
      apiVersion: options?.apiVersion
    })
    try {
      const response = await client.request(query as string, {
        variables: options?.variables as Record<string, unknown>,
        retries: options?.tries,
        headers: options?.headers
      })
      return new Response(JSON.stringify(response)) as any
    } catch (error) {
      if (onError) onError(error)
      throw error
    }
  }

  return { graphql }
}
