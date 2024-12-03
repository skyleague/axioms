import { splitLast } from '../../../iterator/_deprecated/split/index.js'
import type { Traversable } from '../../../type/_deprecated/traversable/index.js'
import type { Maybe } from '../../../type/maybe/index.js'

/**
 * Take the {@link Traversable} and return the last element.
 *
 * The function evaluates the {@link Traversable} and converts it into an array.
 *
 * ### Example
 * ```ts
 * last([1, 2, 3])
 * // => 3
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * last(foobar())
 * // => "bar"
 *
 * last([])
 * // => Nothing
 * ```
 *
 * @param xs - The {@link Traversable} to take the first element from.
 *
 * @returns The last element if it exists, otherwise `Nothing`.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 * @deprecated Use `xs.at(-1)` instead.
 */
export function last<T>(xs: Traversable<T>): Maybe<T> {
    const [, l] = splitLast(xs)
    return l
}
