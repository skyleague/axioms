import { map } from '../../iterator/map'
import type { Traversable } from '../../type/traversable'

/**
 * Creates a generator that enumerates each value of the given {@link Traversable},
 * and gives back a pair with the index on the first position, and the value on the second position.
 *
 * ### Example
 * ```ts
 * collect(enumerate(range(10, 14)))
 * // => [
 * //   [0, 10],
 * //   [1, 11],
 * //   [2, 12],
 * //   [3, 13],
 * // ]
 * ```
 *
 * @param xs - The {@link Traversable} to enumerate.
 *
 * @returns The enumerate generator.
 *
 * @typeParam T - The element type.
 *
 * @group Generators
 */
export function* enumerate<T>(xs: Traversable<T>): Traversable<[number, T], void> {
    yield* map(xs, (x, i) => [i, x])
}
