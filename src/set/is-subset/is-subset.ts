import { all } from '../../iterator/all/index.js'
import type { Traversable } from '../../type/index.js'

/**
 * A set is a subset of the superset if all elements are contained in the superset.
 *
 * We check whether each element in the set belongs to the superset.
 *
 * ### Example
 * ```ts
 * isSubset([1, 2, 3], [2, 3, 4])
 * // => false
 *
 * isSubset([2, 3], [1, 2, 3])
 * // => true
 * ```
 *
 * ### Proposals
 * - [`Set.prototype.isSubsetOf`](https://github.com/tc39/proposal-set-methods)
 *
 * @param sub - The subset to check.
 * @param superset - The set that we are checking to see if it contains the other set.
 * @returns True if `sub` is a subset of `superset`, false otherwise.
 *
 * @typeParam T - The element type.
 *
 * @group Sets
 */
export function isSubset<T>(sub: Traversable<T>, superset: Traversable<T>) {
    const sxs = new Set(superset)
    const sys = new Set(sub)
    return all(sys, (x) => sxs.has(x))
}
