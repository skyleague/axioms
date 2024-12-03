import { repeat } from '../../../generator/_deprecated/repeat/index.js'
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
 * @deprecated Not used in practice.
 */
export function* replicate<T>(x: T | ((i: number) => T), n: number): Generator<T> {
    yield* take(repeat(x), n)
}
