import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { ConsolaInstance } from 'consola'

const INTROSPECTION_QUERY = `query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } } } fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } } fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue } fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } } }`

export interface CodegenOptions {
  /** API versions to generate types for */
  versions: string[]
  /** Nuxt root directory */
  rootDir: string
  /** Logger instance */
  logger: ConsolaInstance
}

/**
 * Fetch schema via introspection from Shopify Admin API.
 * Caches schemas in `.nuxt/shopify-schema/` to skip refetching on subsequent runs.
 */
async function fetchSchema(
  version: string,
  domain: string,
  token: string,
  cacheDir: string,
  logger: ConsolaInstance
): Promise<string> {
  const cachedPath = resolve(cacheDir, `${version}.json`)

  if (existsSync(cachedPath)) {
    logger.debug(`Using cached schema for API ${version}`)
    return cachedPath
  }

  const url = `https://${domain}/admin/api/${version}/graphql.json`
  logger.start(`Fetching schema for API ${version}...`)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: INTROSPECTION_QUERY })
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch schema for ${version}: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()
  await writeFile(cachedPath, JSON.stringify(data, null, 2))
  logger.success(`Fetched schema for API ${version}`)
  return cachedPath
}

/**
 * Build the codegen config and run generation for a set of schema files.
 */
async function generate(
  schemaPaths: Map<string, string>,
  rootDir: string,
  outputDir: string,
  logger: ConsolaInstance
): Promise<Map<string, string>> {
  let codegen: typeof import('@graphql-codegen/cli')
  let shopifyCodegen: typeof import('@shopify/graphql-codegen')
  try {
    codegen = await import('@graphql-codegen/cli')
    shopifyCodegen = await import('@shopify/graphql-codegen')
  } catch {
    logger.warn(
      'Codegen peer dependencies not installed. Install them with:\n' +
        '  bun add -d @graphql-codegen/cli @shopify/graphql-codegen graphql\n' +
        'Skipping codegen.'
    )
    return new Map()
  }

  if (!existsSync(outputDir)) await mkdir(outputDir, { recursive: true })

  const { preset, pluckConfig } = shopifyCodegen
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generates: Record<string, any> = {}
  const outputPaths = new Map<string, string>()

  for (const [version, schemaPath] of schemaPaths) {
    const outputPath = resolve(outputDir, `admin-${version}.d.ts`)
    outputPaths.set(version, outputPath)

    generates[outputPath] = {
      preset,
      schema: schemaPath,
      documents: [
        resolve(rootDir, 'server/**/*.{ts,tsx,js,jsx}'),
        resolve(rootDir, 'app/**/*.{ts,tsx,js,jsx}')
      ],
      presetConfig: {
        skipTypenameInOperations: true
      }
    }
  }

  logger.start(`Generating types for ${schemaPaths.size} API version(s)...`)

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await codegen.generate(
      {
        overwrite: true,
        pluckConfig: pluckConfig as any,
        ignoreNoDocuments: true,
        generates
      },
      true
    )
    logger.success(`Types generated in ${outputDir}`)
  } catch (error) {
    logger.error('Code generation failed:', error)
    return new Map()
  }

  // Write barrel index for each version
  for (const [version] of outputPaths) {
    const indexDir = resolve(outputDir, version)
    if (!existsSync(indexDir)) await mkdir(indexDir, { recursive: true })
    await writeFile(
      resolve(indexDir, 'admin.d.ts'),
      `export * from '../admin-${version}'\n`
    )
  }

  return outputPaths
}

/**
 * Run codegen for all versions and generate typed .d.ts files.
 * Returns a map of version -> output file path for alias registration.
 */
export async function runCodegen(
  options: CodegenOptions
): Promise<Map<string, string>> {
  const { versions, rootDir, logger } = options

  const domain =
    process.env.SHOPIFY_CODEGEN_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN
  const token =
    process.env.SHOPIFY_CODEGEN_ADMIN_ACCESS_TOKEN ||
    process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

  if (!domain || !token) {
    logger.warn(
      'Codegen requires store credentials. Set one of these env var pairs:\n' +
        '  SHOPIFY_CODEGEN_STORE_DOMAIN + SHOPIFY_CODEGEN_ADMIN_ACCESS_TOKEN\n' +
        '  SHOPIFY_STORE_DOMAIN + SHOPIFY_ADMIN_ACCESS_TOKEN\n' +
        'Skipping.'
    )
    return new Map()
  }

  const cacheDir = resolve(rootDir, '.nuxt/shopify-schema')
  const outputDir = resolve(rootDir, '.nuxt/types/shopify')

  if (!existsSync(cacheDir)) await mkdir(cacheDir, { recursive: true })

  // Fetch schemas
  const schemaPaths = new Map<string, string>()
  for (const version of versions) {
    try {
      const schemaPath = await fetchSchema(
        version,
        domain,
        token,
        cacheDir,
        logger
      )
      schemaPaths.set(version, schemaPath)
    } catch (error) {
      logger.error(`Failed to fetch schema for ${version}:`, error)
    }
  }

  if (schemaPaths.size === 0) {
    logger.warn('No schemas fetched. Skipping codegen.')
    return new Map()
  }

  return generate(schemaPaths, rootDir, outputDir, logger)
}

/**
 * Check if a cached schema exists and generate types from it without fetching.
 * Used for quick rebuilds when schemas are already cached.
 */
export async function runCodegenFromCache(
  options: CodegenOptions
): Promise<Map<string, string>> {
  const { versions, rootDir, logger } = options
  const cacheDir = resolve(rootDir, '.nuxt/shopify-schema')
  const outputDir = resolve(rootDir, '.nuxt/types/shopify')

  // Check if all schemas are cached
  const allCached = versions.every((v) =>
    existsSync(resolve(cacheDir, `${v}.json`))
  )
  if (!allCached) {
    logger.debug('Not all schemas cached, running full codegen with fetch...')
    return runCodegen(options)
  }

  // All cached — build schema paths from cache and generate
  const schemaPaths = new Map<string, string>()
  for (const version of versions) {
    schemaPaths.set(version, resolve(cacheDir, `${version}.json`))
  }

  return generate(schemaPaths, rootDir, outputDir, logger)
}
