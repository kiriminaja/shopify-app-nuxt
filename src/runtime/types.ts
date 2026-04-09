import type {
  ApiVersion,
  Session,
  JwtPayload,
  WebhookHandler
} from '@shopify/shopify-api'
import type { SessionStorage } from '@shopify/shopify-app-session-storage'
import type { AdminApiContext } from './server/utils/clients'

// ─── Polaris Icon Type ───────────────────────────────────────────────────────

export type PolarisIcon =
  | 'adjust'
  | 'affiliate'
  | 'airplane'
  | 'alert-bubble'
  | 'alert-circle'
  | 'alert-diamond'
  | 'alert-location'
  | 'alert-octagon'
  | 'alert-octagon-filled'
  | 'alert-triangle'
  | 'alert-triangle-filled'
  | 'app-extension'
  | 'apps'
  | 'archive'
  | 'arrow-down'
  | 'arrow-down-circle'
  | 'arrow-down-right'
  | 'arrow-left'
  | 'arrow-left-circle'
  | 'arrow-right'
  | 'arrow-right-circle'
  | 'arrow-up'
  | 'arrow-up-circle'
  | 'arrow-up-right'
  | 'arrows-in-horizontal'
  | 'arrows-out-horizontal'
  | 'attachment'
  | 'automation'
  | 'backspace'
  | 'bag'
  | 'bank'
  | 'barcode'
  | 'battery-low'
  | 'bill'
  | 'blank'
  | 'blog'
  | 'bolt'
  | 'bolt-filled'
  | 'book'
  | 'book-open'
  | 'bug'
  | 'bullet'
  | 'business-entity'
  | 'button'
  | 'button-press'
  | 'calculator'
  | 'calendar'
  | 'calendar-check'
  | 'calendar-compare'
  | 'calendar-list'
  | 'calendar-time'
  | 'camera'
  | 'camera-flip'
  | 'caret-down'
  | 'caret-left'
  | 'caret-right'
  | 'caret-up'
  | 'cart'
  | 'cart-abandoned'
  | 'cart-discount'
  | 'cart-down'
  | 'cart-filled'
  | 'cart-sale'
  | 'cart-send'
  | 'cart-up'
  | 'cash-dollar'
  | 'cash-euro'
  | 'cash-pound'
  | 'cash-rupee'
  | 'cash-yen'
  | 'catalog-product'
  | 'categories'
  | 'channels'
  | 'chart-cohort'
  | 'chart-donut'
  | 'chart-funnel'
  | 'chart-histogram-first'
  | 'chart-histogram-first-last'
  | 'chart-histogram-flat'
  | 'chart-histogram-full'
  | 'chart-histogram-growth'
  | 'chart-histogram-last'
  | 'chart-histogram-second-last'
  | 'chart-horizontal'
  | 'chart-line'
  | 'chart-popular'
  | 'chart-stacked'
  | 'chart-vertical'
  | 'chat'
  | 'chat-new'
  | 'chat-referral'
  | 'check'
  | 'check-circle'
  | 'check-circle-filled'
  | 'checkbox'
  | 'chevron-down'
  | 'chevron-down-circle'
  | 'chevron-left'
  | 'chevron-left-circle'
  | 'chevron-right'
  | 'chevron-right-circle'
  | 'chevron-up'
  | 'chevron-up-circle'
  | 'circle'
  | 'circle-dashed'
  | 'clipboard'
  | 'clipboard-check'
  | 'clipboard-checklist'
  | 'clock'
  | 'clock-list'
  | 'clock-revert'
  | 'code'
  | 'code-add'
  | 'collection'
  | 'collection-featured'
  | 'collection-list'
  | 'collection-reference'
  | 'color'
  | 'color-none'
  | 'compass'
  | 'complete'
  | 'compose'
  | 'confetti'
  | 'connect'
  | 'content'
  | 'contract'
  | 'corner-pill'
  | 'corner-round'
  | 'corner-square'
  | 'credit-card'
  | 'credit-card-cancel'
  | 'credit-card-percent'
  | 'credit-card-reader'
  | 'credit-card-reader-chip'
  | 'credit-card-reader-tap'
  | 'credit-card-secure'
  | 'credit-card-tap-chip'
  | 'crop'
  | 'currency-convert'
  | 'cursor'
  | 'cursor-banner'
  | 'cursor-option'
  | 'data-presentation'
  | 'data-table'
  | 'database'
  | 'database-add'
  | 'database-connect'
  | 'delete'
  | 'delivered'
  | 'delivery'
  | 'desktop'
  | 'disabled'
  | 'disabled-filled'
  | 'discount'
  | 'discount-add'
  | 'discount-automatic'
  | 'discount-code'
  | 'discount-remove'
  | 'dns-settings'
  | 'dock-floating'
  | 'dock-side'
  | 'domain'
  | 'domain-landing-page'
  | 'domain-new'
  | 'domain-redirect'
  | 'download'
  | 'drag-drop'
  | 'drag-handle'
  | 'drawer'
  | 'duplicate'
  | 'edit'
  | 'email'
  | 'email-follow-up'
  | 'email-newsletter'
  | 'empty'
  | 'enabled'
  | 'enter'
  | 'envelope'
  | 'envelope-soft-pack'
  | 'eraser'
  | 'exchange'
  | 'exit'
  | 'export'
  | 'external'
  | 'eye-check-mark'
  | 'eye-dropper'
  | 'eye-dropper-list'
  | 'eye-first'
  | 'eyeglasses'
  | 'fav'
  | 'favicon'
  | 'file'
  | 'file-list'
  | 'filter'
  | 'filter-active'
  | 'flag'
  | 'flip-horizontal'
  | 'flip-vertical'
  | 'flower'
  | 'folder'
  | 'folder-add'
  | 'folder-down'
  | 'folder-remove'
  | 'folder-up'
  | 'food'
  | 'foreground'
  | 'forklift'
  | 'forms'
  | 'games'
  | 'gauge'
  | 'geolocation'
  | 'gift'
  | 'gift-card'
  | 'git-branch'
  | 'git-commit'
  | 'git-repository'
  | 'globe'
  | 'globe-asia'
  | 'globe-europe'
  | 'globe-lines'
  | 'globe-list'
  | 'graduation-hat'
  | 'grid'
  | 'hashtag'
  | 'hashtag-decimal'
  | 'hashtag-list'
  | 'heart'
  | 'hide'
  | 'hide-filled'
  | 'home'
  | 'home-filled'
  | 'icons'
  | 'identity-card'
  | 'image'
  | 'image-add'
  | 'image-alt'
  | 'image-explore'
  | 'image-magic'
  | 'image-none'
  | 'image-with-text-overlay'
  | 'images'
  | 'import'
  | 'in-progress'
  | 'incentive'
  | 'incoming'
  | 'incomplete'
  | 'info'
  | 'info-filled'
  | 'inheritance'
  | 'inventory'
  | 'inventory-edit'
  | 'inventory-list'
  | 'inventory-transfer'
  | 'inventory-updated'
  | 'iq'
  | 'key'
  | 'keyboard'
  | 'keyboard-filled'
  | 'keyboard-hide'
  | 'keypad'
  | 'label-printer'
  | 'language'
  | 'language-translate'
  | 'layout-block'
  | 'layout-buy-button'
  | 'layout-buy-button-horizontal'
  | 'layout-buy-button-vertical'
  | 'layout-column-1'
  | 'layout-columns-2'
  | 'layout-columns-3'
  | 'layout-footer'
  | 'layout-header'
  | 'layout-logo-block'
  | 'layout-popup'
  | 'layout-rows-2'
  | 'layout-section'
  | 'layout-sidebar-left'
  | 'layout-sidebar-right'
  | 'lightbulb'
  | 'link'
  | 'link-list'
  | 'list-bulleted'
  | 'list-bulleted-filled'
  | 'list-numbered'
  | 'live'
  | 'live-critical'
  | 'live-none'
  | 'location'
  | 'location-none'
  | 'lock'
  | 'map'
  | 'markets'
  | 'markets-euro'
  | 'markets-rupee'
  | 'markets-yen'
  | 'maximize'
  | 'measurement-size'
  | 'measurement-size-list'
  | 'measurement-volume'
  | 'measurement-volume-list'
  | 'measurement-weight'
  | 'measurement-weight-list'
  | 'media-receiver'
  | 'megaphone'
  | 'mention'
  | 'menu'
  | 'menu-filled'
  | 'menu-horizontal'
  | 'menu-vertical'
  | 'merge'
  | 'metafields'
  | 'metaobject'
  | 'metaobject-list'
  | 'metaobject-reference'
  | 'microphone'
  | 'minimize'
  | 'minus'
  | 'minus-circle'
  | 'mobile'
  | 'money'
  | 'money-none'
  | 'money-split'
  | 'moon'
  | 'nature'
  | 'note'
  | 'note-add'
  | 'notification'
  | 'number-one'
  | 'order'
  | 'order-batches'
  | 'order-draft'
  | 'order-filled'
  | 'order-first'
  | 'order-fulfilled'
  | 'order-repeat'
  | 'order-unfulfilled'
  | 'orders-status'
  | 'organization'
  | 'outdent'
  | 'outgoing'
  | 'package'
  | 'package-cancel'
  | 'package-fulfilled'
  | 'package-on-hold'
  | 'package-reassign'
  | 'package-returned'
  | 'page'
  | 'page-add'
  | 'page-attachment'
  | 'page-clock'
  | 'page-down'
  | 'page-heart'
  | 'page-list'
  | 'page-reference'
  | 'page-remove'
  | 'page-report'
  | 'page-up'
  | 'pagination-end'
  | 'pagination-start'
  | 'paint-brush-flat'
  | 'paint-brush-round'
  | 'paper-check'
  | 'partially-complete'
  | 'passkey'
  | 'paste'
  | 'pause-circle'
  | 'payment'
  | 'payment-capture'
  | 'payout'
  | 'payout-dollar'
  | 'payout-euro'
  | 'payout-pound'
  | 'payout-rupee'
  | 'payout-yen'
  | 'person'
  | 'person-add'
  | 'person-exit'
  | 'person-filled'
  | 'person-list'
  | 'person-lock'
  | 'person-remove'
  | 'person-segment'
  | 'personalized-text'
  | 'phablet'
  | 'phone'
  | 'phone-in'
  | 'phone-out'
  | 'pin'
  | 'pin-remove'
  | 'plan'
  | 'play'
  | 'play-circle'
  | 'plus'
  | 'plus-circle'
  | 'plus-circle-down'
  | 'plus-circle-filled'
  | 'plus-circle-up'
  | 'point-of-sale'
  | 'point-of-sale-register'
  | 'price-list'
  | 'print'
  | 'product'
  | 'product-add'
  | 'product-cost'
  | 'product-filled'
  | 'product-list'
  | 'product-reference'
  | 'product-remove'
  | 'product-return'
  | 'product-unavailable'
  | 'profile'
  | 'profile-filled'
  | 'question-circle'
  | 'question-circle-filled'
  | 'radio-control'
  | 'receipt'
  | 'receipt-dollar'
  | 'receipt-euro'
  | 'receipt-folded'
  | 'receipt-paid'
  | 'receipt-pound'
  | 'receipt-refund'
  | 'receipt-rupee'
  | 'receipt-yen'
  | 'receivables'
  | 'redo'
  | 'referral-code'
  | 'refresh'
  | 'remove-background'
  | 'reorder'
  | 'replace'
  | 'replay'
  | 'reset'
  | 'return'
  | 'reward'
  | 'rocket'
  | 'rotate-left'
  | 'rotate-right'
  | 'sandbox'
  | 'save'
  | 'savings'
  | 'scan-qr-code'
  | 'search'
  | 'search-add'
  | 'search-list'
  | 'search-recent'
  | 'search-resource'
  | 'select'
  | 'send'
  | 'settings'
  | 'share'
  | 'shield-check-mark'
  | 'shield-none'
  | 'shield-pending'
  | 'shield-person'
  | 'shipping-label'
  | 'shipping-label-cancel'
  | 'shopcodes'
  | 'slideshow'
  | 'smiley-happy'
  | 'smiley-joy'
  | 'smiley-neutral'
  | 'smiley-sad'
  | 'social-ad'
  | 'social-post'
  | 'sort'
  | 'sort-ascending'
  | 'sort-descending'
  | 'sound'
  | 'split'
  | 'sports'
  | 'star'
  | 'star-circle'
  | 'star-filled'
  | 'star-half'
  | 'star-list'
  | 'status'
  | 'status-active'
  | 'stop-circle'
  | 'store'
  | 'store-import'
  | 'store-managed'
  | 'store-online'
  | 'sun'
  | 'table'
  | 'table-masonry'
  | 'tablet'
  | 'target'
  | 'tax'
  | 'team'
  | 'text'
  | 'text-align-center'
  | 'text-align-left'
  | 'text-align-right'
  | 'text-block'
  | 'text-bold'
  | 'text-color'
  | 'text-font'
  | 'text-font-list'
  | 'text-grammar'
  | 'text-in-columns'
  | 'text-in-rows'
  | 'text-indent'
  | 'text-indent-remove'
  | 'text-italic'
  | 'text-quote'
  | 'text-title'
  | 'text-underline'
  | 'text-with-image'
  | 'theme'
  | 'theme-edit'
  | 'theme-store'
  | 'theme-template'
  | 'three-d-environment'
  | 'thumbs-down'
  | 'thumbs-up'
  | 'tip-jar'
  | 'toggle-off'
  | 'toggle-on'
  | 'transaction'
  | 'transaction-fee-add'
  | 'transaction-fee-dollar'
  | 'transaction-fee-euro'
  | 'transaction-fee-pound'
  | 'transaction-fee-rupee'
  | 'transaction-fee-yen'
  | 'transfer'
  | 'transfer-in'
  | 'transfer-internal'
  | 'transfer-out'
  | 'truck'
  | 'undo'
  | 'unknown-device'
  | 'unlock'
  | 'upload'
  | 'variant'
  | 'variant-list'
  | 'video'
  | 'video-list'
  | 'view'
  | 'viewport-narrow'
  | 'viewport-short'
  | 'viewport-tall'
  | 'viewport-wide'
  | 'wallet'
  | 'wand'
  | 'watch'
  | 'wifi'
  | 'work'
  | 'work-list'
  | 'wrench'
  | 'x'
  | 'x-circle'
  | 'x-circle-filled'

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
   * Used by `<ShApp>` to render the App Bridge nav menu.
   * Each link has a `label`, `href`, and optionally `rel: 'home'` for the default landing page.
   */
  navLinks?: NavLink[]

  /**
   * Component prefix for auto-imported components from the module. Defaults to 'Sh' (e.g., `<ShButton>`).
   * @default 'Sh'
   */
  componentPrefix?: string
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
  /** Admin API client (graphql) */
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

export interface FlowContext<
  Payload extends Record<string, any> = Record<string, any>
> {
  session: Session
  admin: AdminApiContext
  payload: Payload
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

export type MaybeAllValuesShorthandProperty<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`
export type MaybeTwoValuesShorthandProperty<T extends string> = T | `${T} ${T}`
export type MaybeResponsive<T> = T | `@container${string}`

// Size
export type SizeKeyword =
  | 'small-500'
  | 'small-400'
  | 'small-300'
  | 'small-200'
  | 'small-100'
  | 'small'
  | 'base'
  | 'large'
  | 'large-100'
  | 'large-200'
  | 'large-300'
  | 'large-400'
  | 'large-500'

// Color
export type ColorKeyword = 'subdued' | 'base' | 'strong'

// Border
type BorderStyleKeyword = 'none' | 'solid' | 'dashed' | 'dotted' | 'auto'
type BorderSizeKeyword = SizeKeyword | 'none'
type BorderRadiusKeyword = SizeKeyword | 'max' | 'none'

export type BorderShorthand =
  | BorderSizeKeyword
  | `${BorderSizeKeyword} ${ColorKeyword}`
  | `${BorderSizeKeyword} ${ColorKeyword} ${BorderStyleKeyword}`

export type BorderWidthShorthand =
  | MaybeAllValuesShorthandProperty<BorderSizeKeyword>
  | ''

export type BorderStyleShorthand =
  | MaybeAllValuesShorthandProperty<BorderStyleKeyword>
  | ''

export type BorderRadiusShorthand =
  MaybeAllValuesShorthandProperty<BorderRadiusKeyword>

type SizeUnits = `${number}px` | `${number}%` | `0`
type SizeUnitsOrAuto = SizeUnits | 'auto'
type SizeUnitsOrNone = SizeUnits | 'none'

export type BlockSizeShorthand = MaybeResponsive<SizeUnitsOrAuto>
export type MinBlockSizeShorthand = MaybeResponsive<SizeUnits>
export type MaxBlockSizeShorthand = MaybeResponsive<SizeUnitsOrNone>
export type InlineSizeShorthand = MaybeResponsive<SizeUnitsOrAuto>
export type MinInlineSizeShorthand = MaybeResponsive<SizeUnits>
export type MaxInlineSizeShorthand = MaybeResponsive<SizeUnitsOrNone>
