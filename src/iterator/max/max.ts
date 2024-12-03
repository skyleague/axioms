import { isJust } from '../../guard/index.js'
import type { Traversable } from '../../type/_deprecated/traversable/traversable.js'
import type { ComparablePrimitive, Maybe, TraversableItem } from '../../type/index.js'
import { Nothing } from '../../type/index.js'
import { foldl1 } from '../_deprecated/fold/index.js'
import { map } from '../_deprecated/map/index.js'

/**
 * Calculate the maximum value of the given items.
 *
 * ### Example
 * ```ts
 * max([1, 2, 3])
 * // => 3
 * ```
 *
 * ### Alternatives
 * - [Lodash - max](https://lodash.com/docs/4.17.15#max)
 *
 * @param xs - The values to check.
 *
 * @returns The maximum value of the traversable.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function max<T extends Traversable<ComparablePrimitive>>(
    xs: T,
): T extends Iterable<infer I> ? (T extends readonly [unknown, ...unknown[]] ? T[number] : Maybe<I>) : T {
    return foldl1(xs, (a, b) => (b > a ? b : a)) as T extends Iterable<infer I>
        ? T extends readonly [unknown, ...unknown[]]
            ? T[number]
            : Maybe<I>
        : T
}

/**
 * Calculate the maximum value of the given items by applying the function.
 *
 * ### Example
 * ```ts
 * maxBy([{ 'n': 1 }, { 'n': 2 }], x => x.n)
 * // => {n: 2}
 * ```
 *
 * ### Alternatives
 * - [Lodash - maxBy](https://lodash.com/docs/4.17.15#maxBy)
 *
 * @param xs - The values to check.
 *
 * @returns The maximum value of the traversable.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function maxBy<T extends Iterable<unknown>>(
    xs: T,
    f: (item: TraversableItem<T>) => ComparablePrimitive,
): T extends Iterable<infer I> ? (T extends readonly [unknown, ...unknown[]] ? T[number] : Maybe<I>) : T {
    const xMax = foldl1(
        map(xs, (x) => [x, f(x as TraversableItem<T>)] as const),
        (acc, x) => (x[1] > acc[1] ? x : acc),
    )
    return (isJust(xMax) ? xMax[0] : Nothing) as T extends Iterable<infer I>
        ? T extends readonly [unknown, ...unknown[]]
            ? T[number]
            : Maybe<I>
        : T
}
