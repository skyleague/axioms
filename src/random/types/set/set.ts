import type { Tree } from '../../../algorithm/tree'
import { filterTree } from '../../../algorithm/tree'
import { collect } from '../../../array/collect'
import { concat } from '../../../iterator'
import { equal } from '../../../iterator/equal'
import { unique } from '../../../iterator/unique'
import { difference } from '../../../set/difference'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { InfeasibleTree } from '../../arbitrary/shrink'
import { mapArbitrary } from '../../arbitrary/transform'
import { arrayWith } from '../array'
import { tuple } from '../tuple'

function uniqueArbitraryTree<T>(vals: Tree<T[]>, eq: (a: T, b: T) => boolean): Tree<T[]> {
    return filterTree(vals, (x) => collect(unique(x, eq)).length === x.length)
}

/**
 * Describes how the sets allowed to be generated.
 *
 * @group Arbitrary
 */

export interface SetGenerator<T> {
    minLength: number
    maxLength: number
    useBias: boolean
    eq: (a: T, b: T) => boolean
}

/**
 * Generate an array of values where each value is unique.
 *
 * ### Example
 * ```ts
 * random(set(integer()))
 * // => [1, 2, 3]
 * ```
 *
 * @param arbitrary - The arbitrary to generate a set of.
 * @param constraints - The constraints to generate the set with.
 * @returns An arbitrary that is randomly chosen from the weighted list.
 *
 * @group Arbitrary
 */
export function set<T>(arbitrary: Arbitrary<T>, constraints: RelaxedPartial<SetGenerator<T>> = {}): Dependent<T[]> {
    const { minLength = 0, maxLength = 10, useBias = false, eq = equal } = constraints
    const aarray = arrayWith(
        (y, xs, i) => {
            if (i > maxLength * 4) {
                throw new InfeasibleTree()
            }
            return xs.find((x) => eq(y, x)) === undefined
        },
        arbitrary,
        { minLength, maxLength }
    )
    return dependentArbitrary((ctx) => {
        // make sure we don't shrink to an array with duplicates
        return uniqueArbitraryTree<T>(aarray.value({ ...ctx, bias: useBias ? ctx.bias : undefined }), eq)
    })
}

/**
 * Describes how the super and sub sets are generated.
 *
 * @group Arbitrary
 */
export interface SubsuperGenerator<T> {
    minLength: number
    maxLength: number
    eq: (a: T, b: T) => boolean
}

/**
 * It generates a pair of sets, and returns the first set, the union of the two sets, and the
 * difference between the union and the first set
 *
 * ### Example
 * ```ts
 * random(subsuper(integer({ min: 0, max: 100 })))
 * // => [[1, 2], [1, 2, 4, 5], [4, 5]]
 * ```
 *
 * @param arbitrary - The arbitrary to generate a set of.
 * @param constraints - The constraints to generate the set with.
 * @returns An arbitrary that is randomly chosen from the weighted list.
 *
 * @group Arbitrary
 */
export function subsuper<T>(
    arbitrary: Arbitrary<T>,
    constraints: RelaxedPartial<SubsuperGenerator<T>> = {}
): Dependent<[subset: T[], superset: T[], complement: T[]]> {
    const { minLength = 0, maxLength = 10, eq = equal } = constraints
    const sub = set(arbitrary, { minLength, maxLength, eq })
    const complement = set(arbitrary, { minLength, maxLength, eq })
    const pair = tuple(sub, complement)
    return mapArbitrary(pair, ([xs, cs]) => {
        const superset = collect(unique(concat(xs, cs), eq))
        return [xs, superset, [...difference(superset, xs)]]
    })
}
