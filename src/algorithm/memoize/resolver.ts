import { evaluate } from '../../function/evaluate/index.js'
import { isLeft } from '../../guard/is-left/index.js'
import type { Either } from '../../type/either/index.js'
import type { ConstExpr } from '../../type/function/index.js'

/**
 * A resolver function.
 */
export interface Resolver<T> {
    /**
     * A constant function.
     */
    (x: ConstExpr<T>): T

    /**
     * Clears the memoized cache state, and allows for reevaluation.
     */
    clear: () => void
}

/**
 * Caches the value until the value expires.
 *
 * ### Example
 * ```ts
 * let i = 0
 * const mem = memoize(() => i++, ttlCacheResolver(1000))
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
 * @params ttl - The time to live in milliseconds.
 * @returns The cache function resolver.
 *
 * @typeParam T - The element type.
 *
 * @group Algorithm
 */
export function ttlCacheResolver<T>(ttl: number): Resolver<T> {
    let now = new Date().getTime()
    let value: Either<unknown, T> = { left: undefined }
    const resolver: Resolver<T> = ((x: ConstExpr<T>): T => {
        if (isLeft(value)) {
            value = { right: evaluate(x) as T }
            return value.right
        }

        const current = new Date().getTime()
        if (current - now > ttl) {
            value = { right: evaluate(x) as T }
        }
        now = current
        return value.right
    }) as Resolver<T>

    resolver.clear = () => {
        value = { left: undefined }
    }

    return resolver
}

/**
 * Caches the value until it is explicitly cleared.
 *
 * ### Example
 * ```ts
 * let i = 0
 * const mem = memoize(() => i++, cacheResolver())
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
 * @returns The cache function resolver.
 *
 * @typeParam T - The element type.
 *
 * @group Algorithm
 */
export function cacheResolver<T>(): Resolver<T> {
    let value: Either<unknown, T> = { left: undefined }
    const resolver: Resolver<T> = ((x: ConstExpr<T>): T => {
        if (isLeft(value)) {
            value = { right: evaluate(x) as T }
            return value.right
        }
        return value.right
    }) as Resolver<T>

    resolver.clear = () => {
        value = { left: undefined }
    }

    return resolver
}
