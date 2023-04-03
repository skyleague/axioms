import type { Traversable } from '../../type/traversable/index.js'

/**
 * Take two sets and return a new set that contains all the elements of the
 * first set and all the elements of the second set
 *
 * The Union is the result of combining two or more sets together.
 * It is obtained by including all the elements that are present in at least one set
 * from the original group of sets being combined.
 *
 * ### Example
 * ```ts
 * union(new Set([1, 2, 3]), new Set([2, 3, 4]))
 * // => {1, 2, 3, 4}
 *
 * union([1, 2, 3], [2, 3, 4]))
 * // => {1, 2, 3, 4}
 *
 * union(new Set([1, 2, 3]), new Set(['2', '3', '4']))
 * // => {1, 2, 3, '2', '3', '4'}
 * ```
 *
 * ### Proposals
 * - [`Set.prototype.union`](https://github.com/tc39/proposal-set-methods)
 *
 * @param xs - The first iterator.
 * @param ys - The second iterator.
 * @returns A set of all the elements in both `xs` and `ys`.
 *
 * @typeParam T - The element type of the first iterator.
 * @typeParam U - The element type of the second iterator.
 *
 * @group Sets
 */
export function union<T, U = T>(xs: Traversable<T>, ys: Traversable<U>): Set<T | U> {
    const sxs = new Set(xs)
    const sys = new Set(ys)
    return new Set([...sxs, ...sys])
}
