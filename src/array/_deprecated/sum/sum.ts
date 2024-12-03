import { foldl } from '../../../iterator/_deprecated/fold/index.js'
import type { Traversable } from '../../../type/_deprecated/traversable/index.js'

/**
 * Take the {@link Traversable} and return the sum of its elements.
 *
 * The function evaluates the {@link Traversable} and converts it into an array.
 *
 * ### Example
 * ```ts
 * sum([1, 2, 3])
 * // => 6
 *
 * function* foobar() {
 *     yield 1
 *     yield 2
 * }
 * sum(foobar())
 * // => 3
 * ```
 *
 * ### Alternatives
 * - [Lodash - sum](https://lodash.com/docs/4.17.15#sum)
 *
 * @param xs - The {@link Traversable} to sum.
 *
 * @returns The sum of elements.
 *
 * @group Array
 * @deprecated Use `xs.reduce((a, b) => a + b, 0)` instead.
 */
export function sum(xs: Traversable<number>): number {
    return foldl(xs, (a, b): number => a + b, 0)
}
