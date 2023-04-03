import { uncons } from '../../iterator/uncons/index.js'
import type { Traversable, Traverser } from '../../type/traversable/index.js'

/**
 * Take the {@link Traversable}, and returns the iterator without the first element.
 *
 * The function evaluates the {@link Traversable} and converts it into an array.
 *
 * ### Example
 * ```ts
 * collect(tail([1, 2, 3]))
 * // => [2, 3]
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * collect(tail(foobar()))
 * // => ["bar"]
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - Array.shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
 * - [Lodash - tail](https://lodash.com/docs/4.17.15#tail)
 *
 * @param xs - The {@link Traversable}.
 *
 * @returns The elements from the {@link Traversable} without the first element.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 */
export function tail<T>(xs: Traversable<T>): Traverser<T> {
    const [, rest] = uncons(xs)
    return rest
}
