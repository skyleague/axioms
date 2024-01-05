import type { Traversable } from '../../type/index.js'
import { equal } from '../equal/index.js'
import { filterWithMemory } from '../filter/index.js'

/**
 * Take the {@link Traversable} and remove all items that are duplicated. Duplications
 * are detected by applying the `eq` operator.
 *
 * ### Example
 * ```ts
 * collect(unique([1, 2, 3]))
 * // => [1, 2, 3]
 *
 * collect(unique([1, 2, 1, 2, 3]))
 * // => [1, 2, 3]
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * collect(unique(foobar()))
 * // => ["foo", "bar"]
 *
 * collect(unique([]))
 * // => []
 * ```
 *
 * @param xs - The {@link Traversable} to make unique.
 *
 * @returns The unique values.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function unique<T>(xs: Traversable<T>, eq: (a: T, b: T) => boolean = equal): Traversable<T> {
    return filterWithMemory(xs, (y, ys) => !ys.some((x) => eq(y, x)))
}
