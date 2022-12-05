import type { Traversable } from '../../type'

/**
 * Creates a new {@link Traversable} by applying the map function over each element and returning
 * the result.
 *
 * ### Example
 * ```ts
 * map([1, 2, 3], x => x.toString())
 * // => ["1", "2", "3"]
 * ```
 *
 * ### Proposals
 * - [`Iterator.prototype.map`](https://github.com/tc39/proposal-iterator-helpers)
 *
 * @param xs - The values to map.
 * @param by - The function used to transform the values.
 *
 * @returns A record of arrays of T, keyed by K.
 *
 * @typeParam T - The element type.
 * @typeParam R - The mapped type.
 *
 * @group Iterators
 */
export function* map<T, R = T>(xs: Traversable<T>, f: (x: T, i: number) => R): Traversable<R, void> {
    let i = 0
    for (const x of xs) {
        yield f(x, i)
        ++i
    }
}
