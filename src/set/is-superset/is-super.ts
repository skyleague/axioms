import { all } from '../../iterator/all'
import type { Traversable } from '../../type'

/**
 * A set is a superset of the subset if every element in the subset is also in the superset.
 *
 * We check whether each element in the subset belong to the superset.
 *
 * ### Example
 * ```ts
 * isSuperset([1, 2, 3], [2, 3, 4])
 * // => false
 *
 * isSuperset([2, 3], [1, 2, 3])
 * // => false
 *
 * isSuperset([1, 2, 3], [2, 3])
 * // => true
 * ```
 *
 * ### Proposals
 * - [`Set.prototype.isSupersetOf`](https://github.com/tc39/proposal-set-methods)
 *
 * @param sub - The subset to check.
 * @param superset - The set that we are checking to see if it contains the other set.
 * @returns True if `sub` is a subset of `superset`, false otherwise.
 *
 * @typeParam T - The element type.
 *
 * @group Sets
 */
export function isSuperset<T>(superset: Traversable<T>, sub: Traversable<T>) {
    const sxs = new Set(superset)
    const sys = new Set(sub)
    return all(sys, (x) => sxs.has(x))
}
