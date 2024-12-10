import type { IterableElement } from 'type-fest'
import { Nothing } from '../../type/index.js'
import type { Maybe } from '../../type/maybe/maybe.js'

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
export function max<T extends Iterable<bigint | number | string>>(
    xs: T,
): T extends Iterable<infer I> ? (T extends readonly [unknown, ...unknown[]] ? T[number] : Maybe<I>) : T {
    let max: bigint | number | string | undefined = undefined
    for (const x of xs) {
        if (max === undefined || x > max) {
            max = x
        }
    }
    return (max ?? Nothing) as T extends Iterable<infer I>
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
    f: (item: IterableElement<T>) => bigint | number | string,
): T extends Iterable<infer I> ? (T extends readonly [unknown, ...unknown[]] ? T[number] : Maybe<I>) : T {
    let max: unknown = undefined
    let maxValue: bigint | number | string | undefined = undefined
    for (const x of xs) {
        const value = f(x as IterableElement<T>)
        if (maxValue === undefined || value > maxValue) {
            max = x
            maxValue = value
        }
    }
    return (max ?? Nothing) as T extends Iterable<infer I>
        ? T extends readonly [unknown, ...unknown[]]
            ? T[number]
            : Maybe<I>
        : T
}
