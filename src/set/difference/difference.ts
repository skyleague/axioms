import { applicative } from '../../iterator'
import type { Traversable } from '../../type/traversable'

/**
 * Return a set of all the elements in the first set that are not in the second set.
 *
 * The Difference is the result of subtracting one set from another.
 *
 * ### Example
 * ```ts
 * difference(new Set([1, 2, 3]), new Set([2, 3, 4]))
 * // => {1}
 *
 * difference([1, 2, 3], [2, 3, 4])
 * // => {1}
 * ```
 *
 * ### Proposals
 * - [`Set.prototype.difference`](https://github.com/tc39/proposal-set-methods)
 *
 * @param xs - The first iterator.
 * @param ys - The second iterator.
 * @returns A set of all the elements in `xs` that are not in `ys`.
 *
 * @typeParam T - The element type.
 *
 * @group Sets
 */
export function difference<T>(xs: Traversable<T>, ys: Traversable<T>): Set<T> {
    const setA = new Set(xs)
    const setB = new Set(ys)
    return new Set([...setA].filter((x) => !setB.has(x)))
}

/**
 * Given two sets, return a new set containing all the elements that are in one set but not the
 * other.
 *
 * The Symmetric difference is the result of taking the difference of two sets. It is obtained by removing those
 * elements that are in both sets.
 *
 * The first thing we do is create two applicative functors from the two sets. This is necessary
 * because we need to be able to call the {@link difference} function on them
 *
 * ### Example
 * ```ts
 * symmetricDifference(new Set([1, 2, 3]), new Set([2, 3, 4]))
 * // => {1, 4}
 *
 * symmetricDifference([1, 2, 3], [2, 3, 4])
 * // => {1, 4}
 * ```
 *
 * ### Proposals
 * - [`Set.prototype.symmetricDifference`](https://github.com/tc39/proposal-set-methods)
 *
 * @param xs - The first iterator.
 * @param ys - The second iterator.
 * @returns The symmetric difference of the two sets.
 *
 * @typeParam T - The element type.
 *
 * @group Sets
 */
export function symmetricDifference<T>(xs: Traversable<T>, ys: Traversable<T>): Set<T> {
    const aXs = applicative(xs)
    const aYs = applicative(ys)
    return new Set([...difference(aXs, aYs), ...difference(aYs, aXs)])
}
