import type { Tree } from '../../../algorithm/tree/index.js'
import { filterTree } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/collect/index.js'
import { equal } from '../../../iterator/equal/index.js'
import { concat } from '../../../iterator/index.js'
import { unique } from '../../../iterator/unique/index.js'
import { difference } from '../../../set/difference/index.js'
import type { RelaxedPartial } from '../../../type/partial/index.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { InfeasibleTree } from '../../arbitrary/shrink/index.js'
import { mapArbitrary } from '../../arbitrary/transform/index.js'
import { arrayWith } from '../array/index.js'
import { tuple } from '../tuple/index.js'

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
