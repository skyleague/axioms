import type { Traversable } from '../../../type/_deprecated/traversable/index.js'
import type { Maybe } from '../../../type/index.js'
import { Nothing } from '../../../type/index.js'
import { reverse } from '../reverse/index.js'

/**
 * Find the last element in a {@link Traversable} by a given predicate.
 *
 * ### Example
 * ```ts
 * findLast(take(counter(), 123), (i) => i > 10)
 * // => 122
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * findLast(foobar(), (str) => str.startsWith('bar'))
 * // => "bar"
 *
 * findLast(take(counter(100), 100), (i) => i < 10)
 * // => Nothing
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - findLast](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
 * - [Lodash - findLast](https://lodash.com/docs/4.17.15#findLast)
 *
 * @param xs - The {@link Mappable} search in.
 * @param by - The predicate to search with.
 * @param by.item - The element in the {@link Traversable}.
 *
 * @returns The last element that satisfies the given predicate, `Nothing` otherwise.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 * @deprecated Use `xs.findLast(by)` instead.
 */
export function findLast<T>(xs: Traversable<T>, by: (item: T) => boolean): Maybe<T> {
    for (const item of reverse(xs)) {
        if (by(item)) {
            return item
        }
    }
    return Nothing
}
