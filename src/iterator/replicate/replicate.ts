import { repeat } from '../../generator/repeat/index.js'
import { filterWithMemory } from '../filter/index.js'
import { take } from '../take/index.js'

/**
 * Replicate the given value `n` times.
 *
 * ### Example
 * ```ts
 * collect(replicate(1, 2))
 * // => [1, 1]
 *
 * collect(replicate((i) => i, 2))
 * // => [0, 1]
 * ```
 *
 * ### Alternatives
 * - [Lodash - repeat](https://lodash.com/docs/4.17.15#repeat)
 *
 * @param x - The value to replicate.
 * @param n - The amount of times the values should be replicated.
 *
 * @returns The minimum value of the traversable.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function* replicate<T>(x: T | ((i: number) => T), n: number): Generator<T> {
    yield* take(repeat(x), n)
}

/**
 *
 * @param x
 * @param predicate
 * @param n
 * @experimental
 */
export function* replicateWithMemory<T>(
    x: (i: number) => T,
    predicate: (x: T, xs: T[], i: number, skippedInRow: number) => boolean,
    n: number
): Generator<T> {
    yield* take(filterWithMemory(repeat(x), predicate), n)
}
