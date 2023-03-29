import type { Traverser, Maybe, Traversable } from '../../type/index.js'
import { Nothing, toTraverser } from '../../type/index.js'

/**
 * Take the {@link Traversable}, pick the first element and return a pair with the
 * element and the iterator to the rest of the values.
 *
 * ### Example
 * ```ts
 * uncons([1, 2, 3])
 * // => [1, [2, 3]]
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * uncons(foobar())
 * // => ["foo", ["bar"]]
 *
 * uncons([])
 * // => [Nothing, []]
 * ```
 *
 * @param xs - The {@link Traversable} to take the first element from.
 *
 * @returns The first element if it exists, otherwise `Nothing`, and the iterator to the rest of the values.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function uncons<T>(xs: Traversable<T>): [Maybe<T>, Traverser<T>] {
    const iterator = toTraverser(xs)
    const head = iterator.next()
    return [head.done === true ? Nothing : head.value, iterator]
}
