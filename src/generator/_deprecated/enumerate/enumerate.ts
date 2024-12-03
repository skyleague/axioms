import { map } from '../../../iterator/_deprecated/map/index.js'
import type { Traversable } from '../../../type/_deprecated/traversable/index.js'

/**
 * @deprecated use Array.prototype.entries() instead
 */
export function enumerate<T>(xs: T[]): Traversable<[number, T], void>
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
 * ### Proposals
 * - [`Iterator.prototype.indexed`](https://github.com/tc39/proposal-iterator-helpers)
 *
 * @param xs - The {@link Traversable} to enumerate.
 *
 * @returns The enumerate generator.
 *
 * @typeParam T - The element type.
 *
 * @group Generators
 * @deprecated Use `xs.entries()` instead where you can.
 */

export function enumerate<T>(xs: Traversable<T>): Traversable<[number, T], void>
export function* enumerate<T>(xs: Traversable<T>): Traversable<[number, T], void> {
    yield* map(xs, (x, i) => [i, x])
}
