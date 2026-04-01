import type { Session, Shopify, ApiVersion } from '@shopify/shopify-api'
import type {
  AdminOperations,
  AllOperations,
  ApiClientRequestOptions,
  ReturnData,
  FetchResponseBody,
  ResponseWithType
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

  return {
    graphql
  }
}
