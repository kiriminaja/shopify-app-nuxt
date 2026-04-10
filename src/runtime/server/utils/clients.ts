import type { Session, Shopify, ApiVersion } from '@shopify/shopify-api'
import {
  createAdminApiClient,
  type AdminOperations,
  type AllOperations,
  type ApiClientRequestOptions,
  type ReturnData,
  type ClientResponse
} from '@shopify/admin-api-client'

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
  TData = undefined,
  Operation extends keyof Operations = string,
  Operations extends AllOperations = AllOperations
> = ClientResponse<
  TData extends undefined ? ReturnData<Operation, Operations> : TData
>

export type GraphQLClient<Operations extends AllOperations> = <
  TData = undefined,
  Operation extends keyof Operations = string
>(
  query: Operation,
  options?: GraphQLQueryOptions<Operation, Operations>
) => Promise<GraphQLResponse<TData, Operation, Operations>>

// ─── Admin API Context ───────────────────────────────────────────────────────

export interface AdminApiContext {
  /** Make a typed GraphQL request to the Shopify Admin API */
  graphql: GraphQLClient<AdminOperations>
}

// ─── Factories ──────────────────────────────────────────────────────────────

export function createAdminApiContext(
  api: Shopify,
  session: Session,
  onError?: (error: any) => void
): AdminApiContext {
  const client = createAdminApiClient({
    storeDomain: session.shop,
    apiVersion: api.config.apiVersion,
    accessToken: session.accessToken!
  })

  const graphql: GraphQLClient<AdminOperations> = async (query, options) => {
    try {
      return await client.request(query as string, {
        variables: options?.variables as Record<string, any>,
        retries: options?.tries,
        headers: options?.headers,
        apiVersion: options?.apiVersion,
        signal: options?.signal
      })
    } catch (error) {
      if (onError) onError(error)
      throw error
    }
  }

  return {
    graphql
  }
}
