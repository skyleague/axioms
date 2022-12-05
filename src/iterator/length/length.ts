import { isArray } from '../../guard'
import { Nothing } from '../../type'

/**
 * If the type of the argument is an array, return its length, otherwise return Nothing.
 *
 * ### Example
 * ```ts
 * length([1, 2, 3, 4])
 * // => 4
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * length(foobar())
 * // => Nothing
 * ```
 *
 * @param xs - The Traversable to calculate the length of.
 * @returns The length of the traversable if it has one.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function length<T>(xs: T): T extends readonly any[] ? number : Nothing {
    if (isArray(xs)) {
        return xs.length as T extends readonly any[] ? number : Nothing
    }
    return Nothing as T extends readonly any[] ? number : Nothing
}
