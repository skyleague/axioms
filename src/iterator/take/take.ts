import { next } from '../../generator/next/index.js'
import { peekable } from '../../generator/peekable/index.js'
import { isRight } from '../../guard/is-right/index.js'
import type { Traversable, Traverser } from '../../type/traversable/index.js'
import { toTraverser } from '../../type/traversable/index.js'

/**
 * Create a slice of the traversable with the first `n` elements.
 *
 * ### Example
 * ```ts
 * collect(take([1, 2, 3], 2))
 * // => [1, 2]
 * ```
 *
 * ### Alternatives
 * - [`Iterator.prototype.take`](https://github.com/tc39/proposal-iterator-helpers)
 * - [Lodash - take](https://lodash.com/docs/4.17.15#take)
 *
 * @param xs - The elements to take from.
 * @param n - The number of elements to take.
 * @returns The slice.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function* take<T>(xs: Traversable<T>, n: number): Generator<T, Traverser<T>> {
    const iterator = toTraverser(xs)

    for (let i = 0; i < n; ++i) {
        const val = next(iterator)
        // isRight inline
        if ('right' in val) {
            yield val.right
        } else {
            break
        }
    }

    return iterator
}

/**
 * Creates a slice from the traversable where elements are taken until the predicate doesn't hold anymore.
 *
 * ### Example
 * ```ts
 * collect(takeWhile([1, 2, 3], x => x < 3))
 * // => [1, 2]
 * ```
 *
 * ### Alternatives
 * - [Lodash - takeWhile](https://lodash.com/docs/4.17.15#takeWhile)
 *
 * @param xs - The elements to take from.
 * @param predicate - The predicate that holds while taking.
 * @returns The slice.
 *
 * @typeParam T - The element type.
 *
 * @group Iterators
 */
export function* takeWhile<T, R>(xs: Traversable<T, R>, predicate: (x: T) => boolean): Generator<T, Traverser<T, R>> {
    const iterator = peekable(xs)
    for (let peeked = iterator.peek(); isRight(peeked) && predicate(peeked.right); iterator.next(), peeked = iterator.peek()) {
        yield peeked.right
    }
    return iterator
}
