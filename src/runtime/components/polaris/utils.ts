import { computed, useAttrs } from 'vue'

/**
 * Merges $attrs with defined (non-undefined) props for forwarding to Polaris custom elements.
 * With `inheritAttrs: false`, Vue-declared props are stripped from $attrs.
 * This utility re-adds only the props that were actually passed by the parent,
 * avoiding setting undefined values on custom elements which can alter their behavior.
 */
export function usePolarisAttrs<
  T extends Record<string, unknown>,
  E extends keyof T = never,
>(
  props: T,
  exclude?: E[]
) {
  const attrs = useAttrs()
  return computed(() => {
    const merged: Record<string, unknown> = { ...attrs }
    for (const [key, val] of Object.entries(props)) {
      if (val !== undefined && !exclude?.includes(key as E)) {
        merged[key] = val
      }
    }
    return merged as Omit<T, E> & Record<string, unknown>
  })
}
