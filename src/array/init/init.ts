import { splitLast } from '../../iterator/split'
import type { Traversable } from '../../type/traversable'

/**
 * Take the {@link Traversable}, and returns it without the last element.
 *
 * The function evaluates the {@link Traversable} and converts it into an array.
 *
 * ### Example
 * ```ts
 * init([1, 2, 3])
 * // => [1, 2]
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * init(foobar())
 * // => ["foo"]
 * ```
 *
 * ### Alternatives
 * - [Lodash - initial](https://lodash.com/docs/4.17.15#initial)
 *
 * @param xs - The {@link Traversable} to split the last element off from.
 *
 * @returns The elements from the {@link Traversable} without the last element.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 */
export function init<T>(xss: Traversable<T>): T[] {
    const [xs] = splitLast(xss)
    return xs
}
