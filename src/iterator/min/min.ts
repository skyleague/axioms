import { isJust } from '../../guard/index.js'
import type { ComparablePrimitive, Maybe, Traversable, TraversableItem } from '../../type/index.js'
import { Nothing } from '../../type/index.js'
import { foldl1 } from '../_deprecated/fold/index.js'
import { map } from '../_deprecated/map/index.js'

/**
 * Calculate the minimum value of the given items.
 *
 * ### Example
 * ```ts
 * min([1, 2, 3])
 * // => 1
 * ```
 *
 * ### Alternatives
 * - [Lodash - min](https://lodash.com/docs/4.17.15#min)
 *
 * @param xs - The values to check.
 *
 * @returns The minimum value of the traversable.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function min<T extends Traversable<ComparablePrimitive>>(
    xs: T,
): T extends Traversable<infer I> ? (T extends readonly [unknown, ...unknown[]] ? T[number] : Maybe<I>) : T {
    return foldl1(xs, (a, b) => (b < a ? b : a)) as T extends Traversable<infer I>
        ? T extends readonly [unknown, ...unknown[]]
            ? T[number]
            : Maybe<I>
        : T
}

/**
 * Calculate the minimum value of the given items by applying the function.
 *
 * ### Example
 * ```ts
 * minBy([{ 'n': 1 }, { 'n': 2 }], x => x.n)
 * // => {n: 1}
 * ```
 *
 * ### Alternatives
 * - [Lodash - minBy](https://lodash.com/docs/4.17.15#minBy)
 *
 * @param xs - The values to check.
 *
 * @returns The minimum value of the traversable.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function minBy<T extends Traversable<unknown>>(
    xs: T,
    f: (item: TraversableItem<T>) => ComparablePrimitive,
): T extends Traversable<infer I> ? (T extends readonly [unknown, ...unknown[]] ? T[number] : Maybe<I>) : T {
    const xMin = foldl1(
        map(xs, (x) => [x, f(x as TraversableItem<T>)] as const),
        (acc, x) => (x[1] < acc[1] ? x : acc),
    )
    return (isJust(xMin) ? xMin[0] : Nothing) as T extends Traversable<infer I>
        ? T extends readonly [unknown, ...unknown[]]
            ? T[number]
            : Maybe<I>
        : T
}
