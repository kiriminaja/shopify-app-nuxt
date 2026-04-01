import { computed, useAttrs } from 'vue'

/**
 * Merges $attrs with defined (non-undefined) props for forwarding to Polaris custom elements.
 * With `inheritAttrs: false`, Vue-declared props are stripped from $attrs.
 * This utility re-adds only the props that were actually passed by the parent,
 * avoiding setting undefined values on custom elements which can alter their behavior.
 */
export function usePolarisAttrs<T extends Record<string, unknown>>(
  props: T,
  exclude?: (keyof T)[]
) {
  const attrs = useAttrs()
  return computed(() => {
    const merged: Record<string, unknown> = { ...attrs }
    for (const [key, val] of Object.entries(props)) {
      if (val !== undefined && !exclude?.includes(key)) {
        merged[key] = val
      }
    }
    return merged
  })
}
