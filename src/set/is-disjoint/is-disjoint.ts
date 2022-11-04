import { all } from '../../iterator/all'
import type { Traversable } from '../../type'

/**
 * Two sets of elements are disjoint when they have no members in common.
 *
 * The `isDisjoint` determines whether a given collection of sets are disjoint or not.
 *
 * There are two approaches to the problem:
 * 1) Checking if each member of the first set is a member of the second set
 * 2) Checking if there exists any members that are not in both sets
 *
 * If either approach returns true, then the sets are not disjoint and hence they are not mutually exclusive.
 *
 * ### Example
 * ```ts
 * isDisjoint([1, 2, 3], [2, 3, 4])
 * // => false
 *
 * isDisjoint([1, 2, 3], [4, 5, 6])
 * // => true
 * ```
 *
 * @param xs - The first iterator.
 * @param ys - The second iterator.
 * @returns True if `xs` and `ys` are disjoint, false otherwise.
 *
 * @typeParam T - The element type.
 *
 * @group Sets
 */
export function isDisjoint<T>(xs: Traversable<T>, ys: Traversable<T>) {
    const sxs = new Set(xs)
    const sys = new Set(ys)
    return all(sxs, (x) => !sys.has(x))
}
