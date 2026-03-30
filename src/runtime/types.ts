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
   * Optional — Shopify reads scopes from `shopify.app.toml` with managed install.
   */
  scopes?: string[]

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

  /**
   * Path to a custom Vue page component for the `/auth` login page.
   * Set to `false` to disable the built-in auth page entirely.
   * When not set, a default login page with a shop domain input is provided.
   * @default undefined (uses built-in page)
   */
  authPage?: string | false

  /**
   * Navigation links for the app sidebar (`<ShAppNav>`).
   * Used by `<ShopifyAppProvider>` to render the App Bridge nav menu.
   * Each link has a `label`, `href`, and optionally `rel: 'home'` for the default landing page.
   */
  navLinks?: NavLink[]
}

export interface NavLink {
  /** The visible label text for the navigation item */
  label: string
  /** The URL path for the navigation item (e.g., `/products`) */
  href: string
  /** Set to `'home'` to designate this link as the app's default landing page */
  rel?: 'home'
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

export interface AdminContext<T extends object = JwtPayload> {
  /** The authenticated session */
  session: Session
  /** Admin API client (graphql + rest) */
  admin: AdminApiContext
  /** The decoded session token (embedded apps only) */
  sessionToken?: T
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

// ─── Nuxt Runtime Config Types ───────────────────────────────────────────────

export interface ShopifyServerConfig {
  apiKey: string
  apiSecretKey: string
  scopes: string[]
  appUrl: string
  apiVersion: string
  authPathPrefix: string
  distribution: string
  useOnlineTokens: boolean
}

export interface ShopifyPublicConfig {
  apiKey: string
  authPagePath: string
  authPathPrefix: string
  navLinks: NavLink[]
}

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    shopify: ShopifyServerConfig
  }
  interface PublicRuntimeConfig {
    shopify: ShopifyPublicConfig
  }
}

export interface ResolvedConfig {
  apiKey: string
  apiSecretKey: string
  scopes?: string[]
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
