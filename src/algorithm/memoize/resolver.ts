import { evaluate } from '../../function/evaluate/index.js'
import { isLeft } from '../../guard/is-left/index.js'
import { objectHasher } from '../../random/deterministic/hash/hash.js'
import type { Either } from '../../type/either/index.js'
import type { ConstExpr } from '../../type/function/index.js'

/**
 * A resolver function.
 */
// biome-ignore lint/suspicious/noExplicitAny: This is a memoize function that is used to cache the result of a function.
export type Resolver<Fn extends (...args: any) => any> = {
    (fn: Fn, ...args: Parameters<Fn>): ReturnType<Fn>

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
export function ttlCacheResolver<Fn extends () => unknown>(ttl: number): Resolver<Fn> {
    type T = ReturnType<Fn>
    let now = new Date().getTime()
    let value: Either<unknown, T> = { left: undefined }
    const resolver: Resolver<Fn> = ((x: Fn): T => {
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
    }) as unknown as Resolver<Fn>

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

export function cacheResolver<Fn extends () => unknown>(): Resolver<Fn> {
    type T = ReturnType<Fn>
    let value: Either<unknown, T> = { left: undefined }

    const resolver: Resolver<Fn> = ((x: ConstExpr<T>): T => {
        if (isLeft(value)) {
            value = { right: evaluate(x) as T }
            return value.right
        }
        return value.right
    }) as unknown as Resolver<Fn>

    resolver.clear = () => {
        value = { left: undefined }
    }

    return resolver
}

// biome-ignore lint/suspicious/noExplicitAny: This is a memoize function that is used to cache the result of a function.
export function LRUCacheResolver<Fn extends (...args: any) => any>({
    maxItems = 10,
    key = (...args) => args,
}: { maxItems?: number; key?: (...args: Parameters<Fn>) => unknown } = {}): Resolver<Fn> {
    type T = ReturnType<Fn>
    let cache = new Map<string, T>()

    const get = (key: string) => {
        if (cache.has(key)) {
            // biome-ignore lint/style/noNonNullAssertion: just checked if the item is in the cache
            const item = cache.get(key)!
            cache.delete(key)
            cache.set(key, item)
            return { right: item }
        }
        return { left: undefined }
    }
    const set = (key: string, val: T) => {
        if (cache.has(key)) {
            cache.delete(key)
        } else if (cache.size >= maxItems) {
            // biome-ignore lint/style/noNonNullAssertion: we have a positive size
            cache.delete(cache.keys().next().value!)
        }
        cache.set(key, val)
    }

    const resolver: Resolver<Fn> = ((fn: Fn, ...args: Parameters<Fn>): T => {
        const retrievedKey = key(...args)
        const hash = typeof retrievedKey === 'string' ? retrievedKey : objectHasher.hash(retrievedKey)
        const item = get(hash)
        if ('left' in item) {
            const result = fn(...args)
            set(hash, result)
            return result
        }
        return item.right
    }) as unknown as Resolver<Fn>

    resolver.clear = () => {
        cache = new Map<string, T>()
    }

    return resolver
}
