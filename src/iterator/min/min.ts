import type { IterableElement } from 'type-fest'
import { Nothing } from '../../type/index.js'
import type { Maybe } from '../../type/maybe/maybe.js'

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
 * @returns The minimum value of the Iterable.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function min<T extends Iterable<bigint | number | string>>(
    xs: T,
): T extends Iterable<infer I> ? (T extends readonly [unknown, ...unknown[]] ? T[number] : Maybe<I>) : T {
    let min: bigint | number | string | undefined = undefined
    for (const x of xs) {
        if (min === undefined || x < min) {
            min = x
        }
    }
    return (min ?? Nothing) as T extends Iterable<infer I>
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
 * @returns The minimum value of the Iterable.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function minBy<T extends Iterable<unknown>>(
    xs: T,
    f: (item: IterableElement<T>) => bigint | number | string,
): T extends Iterable<infer I> ? (T extends readonly [unknown, ...unknown[]] ? T[number] : Maybe<I>) : T {
    let min: unknown = undefined
    let minValue: bigint | number | string | undefined = undefined
    for (const x of xs) {
        const value = f(x as IterableElement<T>)
        if (minValue === undefined || value < minValue) {
            min = x
            minValue = value
        }
    }
    return (min ?? Nothing) as T extends Iterable<infer I>
        ? T extends readonly [unknown, ...unknown[]]
            ? T[number]
            : Maybe<I>
        : T
}
