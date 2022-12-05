import type { Traversable } from '../../type'

/**
 * Calculate the intersection between the given {@link Traversable}s.
 *
 * The Intersection is the result of combining two or more sets together.
 * It is obtained by including all the elements that are present in all the original groups.
 *
 * ### Example
 * ```ts
 * intersection(new Set([1, 2, 3]), new Set([2, 3, 4]))
 * // => {2, 3}
 *
 * intersection([1, 2, 3], [2, 3, 4])
 * // => {2, 3}
 * ```
 *
 * ### Proposals
 * - [`Set.prototype.intersection`](https://github.com/tc39/proposal-set-methods)
 *
 * @param xs - The first iterator.
 * @param ys - The second iterator.
 * @returns A set of the elements that are in both `xs` and `ys`.
 *
 * @typeParam T - The element type.
 *
 * @group Sets
 */
export function intersection<T>(xs: Traversable<T>, ys: Traversable<T>): Set<T> {
    const sxs = new Set(xs)
    const sys = new Set(ys)
    return new Set([...sxs].filter((x) => sys.has(x)))
}
