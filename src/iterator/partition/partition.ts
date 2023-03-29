import { enumerate } from '../../generator/enumerate/index.js'
import type { Traversable } from '../../type/index.js'

export type Partition<U, T> = [T[], Exclude<U, T>[]]

/**
 * Partitions a traversable into disjoint arrays of results.
 * The first array of the result contains the items that match the predicate.
 * The second array of the result contains the items that didn't match the predicate.
 *
 * ### Example
 * ```ts
 * partition([1, 'a'], isString)
 * // => [['a'], [1]]
 * ```
 *
 * ### Alternatives
 * - [Lodash - partition](https://lodash.com/docs/4.17.15#partition)
 *
 * @param xs - The values to partition.
 *
 * @returns The partitions.
 *
 * @typeParam U - The element type of the input.
 * @typeParam T - The element type for the first partition.
 *
 * @group Iterators
 */
export function partition<U, T extends U>(xs: Traversable<U>, by: (item: U, index: number) => item is T): Partition<U, T> {
    const ts: T[] = []
    const us: Exclude<U, T>[] = []

    for (const [i, x] of enumerate(xs)) {
        if (by(x, i)) {
            ts.push(x)
        } else {
            us.push(x as Exclude<U, T>)
        }
    }

    return [ts, us]
}
