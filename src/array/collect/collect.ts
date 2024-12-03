import type { Mappable } from '../../type/index.js'
import { toTraversable } from '../../type/index.js'

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
 * ### Proposals
 * - [`Iterator.prototype.toArray`](https://github.com/tc39/proposal-iterator-helpers)
 *
 * @param xs - The {@link Mappable}.
 *
 * @returns The {@link Mappable} as array.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 * @deprecated Use `xs.toArray()` instead
 */
export function collect<T>(xs: Mappable<T>): T[] {
    return [...toTraversable(xs)]
}
