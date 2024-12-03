import { uncons } from '../../../iterator/_deprecated/uncons/index.js'
import type { Traversable } from '../../../type/_deprecated/traversable/index.js'
import type { Maybe } from '../../../type/maybe/index.js'

/**
 * Take the first element of the {@link Traversable}.
 *
 * ### Example
 * ```ts
 * head([1, 2, 3])
 * // => 1
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * head(foobar())
 * // => "bar"
 *
 * head([])
 * // => Nothing
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - Array.shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
 *
 * @param xs - The {@link Traversable} to take the first element from.
 *
 * @returns The first element, `Nothing` if there is none.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 * @deprecated Use `xs[0]` instead.
 */
export function head<T>(xs: Traversable<T>): Maybe<T> {
    const [h] = uncons(xs)
    return h
}
