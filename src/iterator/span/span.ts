import { next } from '../../generator/next/index.js'
import { isRight } from '../../guard/is-right/index.js'
import type { Traversable, Traverser } from '../../type/traversable/index.js'
import { takeWhile } from '../take/index.js'

/**
 * Returns a tuple where first element is longest prefix of `xs` of elements
 * that satisfy the predicate and second element is the remainder of the traversable.
 *
 * ### Example
 * ```ts
 * const [init, rest] = span([1, 2, 3, 4], (x) => x < 3)
 * init
 * // => [1, 2]
 *
 * collect(rest)
 * // => [3, 4]
 * ```
 *
 * @param xs - The values to span.
 * @param predicate - The predicate to split the traversable on.
 * @returns A tuple.
 *
 * @typeParam T - The element type.
 * @typeParam R - The return type.
 *
 * @group Iterators
 */
export function span<T, R>(xs: Traversable<T, R>, predicate: (x: T) => boolean): [T[], Traverser<T, R>] {
    const takeIterator = takeWhile(xs, predicate)
    const first: T[] = []
    let it = next(takeIterator)
    while (isRight(it)) {
        first.push(it.right)
        it = next(takeIterator)
    }
    const rest = it.left
    return [first, rest]
}
