import type { Session, Shopify } from '@shopify/shopify-api'

export interface AdminApiContext {
  /** Make a GraphQL request to the Shopify Admin API */
  graphql: (
    query: string,
    options?: { variables?: Record<string, any> }
  ) => Promise<any>
  /** Make a REST request to the Shopify Admin API */
  rest: {
    get: (params: { path: string }) => Promise<any>
    post: (params: { path: string; data?: any }) => Promise<any>
    put: (params: { path: string; data?: any }) => Promise<any>
    delete: (params: { path: string }) => Promise<any>
  }
}

export function createAdminApiContext(
  api: Shopify,
  session: Session,
  onError?: (error: any) => void
): AdminApiContext {
  const graphql = async (
    query: string,
    options?: { variables?: Record<string, any> }
  ) => {
    const client = new api.clients.Graphql({ session })
    try {
      const response = await client.request(query, {
        variables: options?.variables
      })
      return response
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
