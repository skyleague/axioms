import { peekable } from '../../../generator/_deprecated/peekable/index.js'
import { isRight } from '../../../guard/is-right/index.js'
import { toTraversable, toTraverser } from '../../../type/_deprecated/traversable/index.js'
import type { Traversable } from '../../../type/_deprecated/traversable/index.js'

/**
 * Removes `n` elements from the {@link Traversable}.
 *
 * ### Example
 * ```ts
 * collect(drop([1, 2, 3, 4], 2))
 * // => [3, 4]
 *
 * function* foobar() {
 *     yield 'foo'
 *     yield 'bar'
 * }
 * collect(drop(foobar(), 1))
 * // => ["bar"]
 *
 * collect(drop([1], 4))
 * // => []
 * ```
 *
 * ### Alternatives
 * - [ECMAScript - Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
 * - [Lodash - drop](https://lodash.com/docs/4.17.15#drop)
 *
 * ### Proposals
 * - [`Iterator.prototype.drop`](https://github.com/tc39/proposal-iterator-helpers)
 *
 * @param xs - The {@link Traversable} to drop elements from.
 * @param n - The predicate to search with.
 *
 * @returns  The {@link Traversable} without the first `n` elements.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 * @deprecated Use `xs.drop(n)` instead
 */
export function* drop<T>(xs: Traversable<T>, n: number): Traversable<T, void> {
    const iterator = toTraverser(xs)
    for (let i = 0; i < n; ++i, iterator.next()) {
        //
    }
    yield* toTraversable(iterator)
}

/**
 * Removes elements from the {@link Traversable} as long as the predicate returns `true`.
 *
 * @param xs - The {@link Traversable} to drop elements from.
 * @param predicate - The predicate to search with.
 *
 * @returns The {@link Traversable} without the first `n` elements.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 * @deprecated Rarely used in practice
 */
export function* dropWhile<T>(xs: Traversable<T>, predicate: (x: T) => boolean): Traversable<T, void> {
    const iterator = peekable(xs)
    for (let peeked = iterator.peek(); isRight(peeked) && predicate(peeked.right); iterator.next(), peeked = iterator.peek()) {
        //
    }
    yield* toTraversable(iterator)
}
