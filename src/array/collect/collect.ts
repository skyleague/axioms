import type { Mappable } from '../../type'
import { toTraversable } from '../../type'

/**
 * Converts a {@link Mappable} to an array.
 *
 * ### Example
 * ```ts
 * collect([1, 2, 3])
 * // => [1, 2, 3]
 *
 * collect(take(counter(), 4))
 * // => [0, 1, 2, 3]
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * collect(foobar())
 * // => ["foo", "bar"]
 * ```
 *
 * @param xs - The {@link Mappable}.
 *
 * @returns The {@link Mappable} as array.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 */
export function collect<T>(xs: Mappable<T>): T[] {
    return [...toTraversable(xs)]
}
