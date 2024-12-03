import type { Traversable } from '../../../type/_deprecated/traversable/index.js'
import { drop } from '../drop/index.js'

/**
 * Reduces the given traversable with the reducer function, but yields all the intermediate
 * values used in calculating the result.
 *
 * ### Example
 * ```ts
 * const div = (a: number, b: number) => a / b
 * collect(scanl([4, 2, 4], div, 64))
 * // => [64, 16, 8, 2]
 * ```
 *
 * @param xs - The values to scan.
 * @param reducer - The function that is used to reduce the values.
 * @returns The reduced value.
 *
 * @typeParam T - The element type.
 * @typeParam R - The return type.
 *
 * @group Iterators
 * @deprecated Use `xs.reduce(reducer, init)` instead
 */
export function* scanl<T, R>(xs: Traversable<T>, reducer: (acc: R, val: T) => R, init: R) {
    let acc = init
    yield acc
    for (const x of xs) {
        acc = reducer(acc, x)
        yield acc
    }
    return acc
}

/**
 * @experimental
 * @deprecated Use `xs.reduce(reducer, init)` instead
 */
export function* scanl1<T>(xs: Traversable<T>, reducer: (acc: T, val: T) => T) {
    yield* scanl(drop(xs, 1), reducer, xs[Symbol.iterator]().next().value as T)
}
