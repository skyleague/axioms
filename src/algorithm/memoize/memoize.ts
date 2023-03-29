import type { Resolver } from './resolver.js'
import { cacheResolver } from './resolver.js'

import type { ConstExpr } from '../../type/function/index.js'

/**
 * A memoized function.
 */
export interface Memoized<T> {
    /**
     * A constant function.
     */
    (): T

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
export function memoize<T>(getter: ConstExpr<T>, resolver: Resolver<T> = cacheResolver()): Memoized<T> {
    const memoized: Memoized<T> = () => resolver(getter)

    memoized.clear = () => resolver.clear()

    return memoized
}
