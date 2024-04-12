import type { Maybe, Traversable } from '../../type/index.js'
import { Nothing } from '../../type/index.js'

/**
 * Find the first element in a {@link Traversable} by a given predicate.
 *
 * ### Example
 * ```ts
 * findFirst(counter(), (i) => i > 10)
 * // => 10
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * findFirst(foobar(), (str) => str.startsWith('bar'))
 * // => "bar"
 *
 * findFirst(take(counter(100), 100), (i) => i < 10)
 * // => Nothing
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
 * - [Lodash - find](https://lodash.com/docs/4.17.15#find)
 *
 * ### Proposals
 * - [`Iterator.prototype.find`](https://github.com/tc39/proposal-iterator-helpers)
 *
 * @param xs - The {@link Mappable} to search in.
 * @param by - The predicate to search with.
 * @param by.item - The element in the {@link Traversable}.
 *
 * @returns The first element that satisfies the given predicate, `Nothing` otherwise.
 *
 * @typeParam T - The element type.
 *
 * @group Array
 */
export function findFirst<T>(xs: Traversable<T>, by: (item: T) => boolean): Maybe<T> {
    for (const item of xs) {
        if (by(item)) {
            return item
        }
    }
    return Nothing
}
