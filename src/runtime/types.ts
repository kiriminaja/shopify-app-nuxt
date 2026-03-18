import type {
  ApiVersion,
  Session,
  JwtPayload,
  WebhookHandler
} from '@shopify/shopify-api'
import type { SessionStorage } from '@shopify/shopify-app-session-storage'
import type { AdminApiContext } from './server/utils/clients'

// ─── Module Options (nuxt.config.ts) ─────────────────────────────────────────

export enum AppDistribution {
  AppStore = 'app_store',
  SingleMerchant = 'single_merchant',
  ShopifyAdmin = 'shopify_admin'
}

export interface ModuleOptions {
  /**
   * The Shopify API key for your app.
   * Can also be set via `NUXT_SHOPIFY_API_KEY` env var.
   */
  apiKey: string

  /**
   * The Shopify API secret key for your app.
   * Can also be set via `NUXT_SHOPIFY_API_SECRET_KEY` env var.
   */
  apiSecretKey: string

  /**
   * The scopes your app needs from the Shopify API.
   */
  scopes: string[]

  /**
   * The URL your app is running on. In development, this is typically a tunnel URL.
   * Can also be set via `NUXT_SHOPIFY_APP_URL` env var.
   */
  appUrl: string

  /**
   * The Shopify API version to use. Defaults to the latest stable version.
   */
  apiVersion?: ApiVersion

  /**
   * A path prefix for Shopify auth endpoints.
   * @default '/_shopify/auth'
   */
  authPathPrefix?: string

  /**
   * How your app is distributed.
   * @default 'app_store'
   */
  distribution?: AppDistribution

  /**
   * Whether to use online tokens (user-specific) instead of offline tokens (shop-specific).
   * If true, both online and offline tokens will be stored.
   * @default false
   */
  useOnlineTokens?: boolean
}

// ─── Runtime Config (configureShopify) ───────────────────────────────────────

export type WebhookConfig = Record<string, WebhookHandler | WebhookHandler[]>

export interface AfterAuthOptions {
  session: Session
  admin: AdminApiContext
}

export interface HooksConfig {
  afterAuth?: (options: AfterAuthOptions) => void | Promise<void>
}

export interface ShopifyRuntimeConfig {
  /** Session storage adapter */
  sessionStorage?: SessionStorage

  /** Webhook handler configuration */
  webhooks?: WebhookConfig

  /** Lifecycle hooks */
  hooks?: HooksConfig

  /** Billing configuration */
  billing?: Record<string, any>
}

// ─── Auth Contexts ───────────────────────────────────────────────────────────

export interface AdminContext {
  /** The authenticated session */
  session: Session
  /** Admin API client (graphql + rest) */
  admin: AdminApiContext
  /** The decoded session token (embedded apps only) */
  sessionToken?: JwtPayload
  /** Billing helpers */
  billing: BillingContext
  /** CORS header helper */
  cors: (response: Response) => Response
  /** Redirect helper for embedded apps */
  redirect: (
    url: string,
    init?: { target?: '_self' | '_parent' | '_top' | '_blank' }
  ) => Response
}

export interface BillingContext {
  require: (options: { plans: string | string[] }) => Promise<void>
  check: (options?: { plans?: string | string[] }) => Promise<any>
  request: (options: {
    plan: string
    isTest?: boolean
    returnUrl?: string
  }) => Promise<Response>
}

export interface WebhookContext {
  topic: string
  shop: string
  session?: Session
  payload: Record<string, any>
  apiVersion: string
}

export interface FlowContext {
  session: Session
  admin: AdminApiContext
  payload: Record<string, any>
}

export interface PublicContext {
  sessionToken: JwtPayload
  cors: (response: Response) => Response
}

export interface LoginError {
  shop?: LoginErrorType
}

export enum LoginErrorType {
  MissingShop = 'MISSING_SHOP',
  InvalidShop = 'INVALID_SHOP'
}

// ─── Internal Config ─────────────────────────────────────────────────────────

export interface AuthConfig {
  path: string
  callbackPath: string
  exitIframePath: string
  patchSessionTokenPath: string
  loginPath: string
}

export interface ResolvedConfig {
  apiKey: string
  apiSecretKey: string
  scopes: string[]
  appUrl: string
  apiVersion: string
  authPathPrefix: string
  distribution: AppDistribution
  useOnlineTokens: boolean
  auth: AuthConfig
  sessionStorage?: SessionStorage
  webhooks?: WebhookConfig
  hooks: HooksConfig
  billing?: Record<string, any>
}
