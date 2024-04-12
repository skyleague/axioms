import type { Traversable } from '../../type/traversable/index.js'
import { foldl } from '../fold/index.js'

/**
 * It takes a list of values and a function that maps each value to a key, and returns a dictionary of
 * lists of values, where each list contains all the values that map to the same key
 *
 * ### Example
 * ```ts
 * groupBy([1, 2, 3, 4, 5], (x) => (x % 2 === 0 ? 'even' : 'odd'))
 * // => {
 * //  even: [2, 4],
 * //  odd: [1, 3, 5]
 * // }
 * ```
 *
 * ### Alternatives
 * - [Lodash - groupBy](https://lodash.com/docs/4.17.15#groupBy)
 *
 * ### Proposals
 * - [`Array.prototype.group`](https://github.com/tc39/proposal-array-grouping)
 *
 * @param xs - The list of values to group.
 * @param group - A function that returns a group index.
 *
 * @returns A record of arrays of T, keyed by K.
 *
 * @typeParam T - The element type.
 * @typeParam K - The key type.
 *
 * @group Iterators
 */
export function groupBy<T, K extends PropertyKey>(xs: Traversable<T>, group: (val: T) => K): Record<K, T[]> {
    return foldl(
        xs,
        (r, v) => {
            const k = group(v)
            r[k] ??= []
            r[k].push(v)
            return r
        },
        {} as Record<K, T[]>,
    )
}
