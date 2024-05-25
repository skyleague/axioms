import type { Resolver } from './resolver.js'
import { cacheResolver } from './resolver.js'

/**
 * A memoized function.
 */

// biome-ignore lint/complexity/noBannedTypes: This is a memoize function that is used to cache the result of a function.
export type Memoized<Fn extends Function> = Fn & {
    /**
     * Clears the memoized cache state, and allows for reevaluation.
     */
    clear: () => void
}

/**
 * Memoizes a constant or a constant function output. Subsequent calls to the function will
 * not evaluate the given constant function, but uses a cached value instead.
 *
 * ### Example
 * ```ts
 * let i = 0
 * const mem = memoize(() => i++)
 * mem()
 * // => 0
 *
 * mem()
 * // => 0
 *
 * mem.clear()
 * mem()
 * // => 1
 * ```
 *
 * ### Alternatives
 * - [Lodash - memoize](https://lodash.com/docs/4.17.15#memoize)
 *
 * @param getter - The constant or constant function.
 * @param resolver - The resolver that defines how the constant function should be retrieved.
 *
 * @returns The memoized function to the constant.
 *
 * @typeParam T - The element type.
 *
 * @group Algorithm
 */

// biome-ignore lint/suspicious/noExplicitAny: This is a memoize function that is used to cache the result of a function.
export function memoize<Fn extends () => any>(getter: Fn): Memoized<Fn>
// biome-ignore lint/suspicious/noExplicitAny: This is a memoize function that is used to cache the result of a function.
export function memoize<Fn extends (...args: any) => any>(getter: Fn, resolver: Resolver<Fn>): Memoized<Fn>
// biome-ignore lint/suspicious/noExplicitAny: This is a memoize function that is used to cache the result of a function.
export function memoize<Fn extends (...args: any) => any>(getter: Fn, resolver: Resolver<Fn> = cacheResolver()): Memoized<Fn> {
    // biome-ignore lint/suspicious/noExplicitAny: This is a memoize function that is used to cache the result of a function.
    const memoized: Memoized<Fn> = ((...args: any) => resolver(getter, ...args)) as Memoized<Fn>

    memoized.clear = () => {
        resolver.clear()
    }

    return memoized
}
