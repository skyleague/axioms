import type { Tree } from '../../../algorithm/tree/index.js'
import { filterTree } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/collect/index.js'
import { equal } from '../../../iterator/equal/index.js'
import { concat } from '../../../iterator/index.js'
import { unique } from '../../../iterator/unique/index.js'
import { difference } from '../../../set/difference/index.js'
import type { MaybePartial } from '../../../type/partial/partial.js'
import type { ReadonlyTuple } from '../../../types.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { ArbitrarySize } from '../../arbitrary/arbitrary/size.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { InfeasibleTree } from '../../arbitrary/shrink/index.js'
import { mapArbitrary } from '../../arbitrary/transform/index.js'
import { arrayWith } from '../array/index.js'
import { tuple } from '../tuple/index.js'

function uniqueArbitraryTree<T>(vals: Tree<T[]>, eq: (a: T, b: T) => boolean): Tree<T[]> {
    return filterTree(vals, (x) => collect(unique(x, eq)).length === x.length)
}

export type SetOf<T, Min extends number> = Min extends 0 | 1 | 2 | 3 | 4 ? [...ReadonlyTuple<T, Min>, ...T[]] : T[]

/**
 * Describes how the sets allowed to be generated.
 *
 * @group Arbitrary
 */

export interface SetGenerator<T, Min extends number> {
    minLength: Min
    maxLength: number
    useBias: boolean
    size: ArbitrarySize
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
export function set<T, Min extends number = number>(
    arbitrary: Arbitrary<T>,
    constraints: MaybePartial<SetGenerator<T, Min>> = {},
): Dependent<SetOf<T, Min>> {
    const { minLength = 0, useBias = false, eq = equal, size, maxLength } = constraints
    const aarray = arrayWith(
        (y, xs, i, { maxLength: max }) => {
            if (i > max * 4) {
                throw new InfeasibleTree()
            }
            return !xs.some((x) => eq(y, x))
        },
        arbitrary,
        {
            minLength,
            maxLength,
            size,
            cardinality: (x, ctx) => {
                if (arbitrary.supremumCardinality !== undefined) {
                    return Math.min(x, arbitrary.supremumCardinality(ctx))
                }
                return x
            },
        },
    )

    return dependentArbitrary((ctx) => {
        // make sure we don't shrink to an array with duplicates
        // biome-ignore lint/suspicious/noExplicitAny: end recursive type evaluation
        return uniqueArbitraryTree<T>(aarray.value(arbitraryContext({ ...ctx, bias: useBias ? ctx.bias : undefined })) as any, eq)
    }) as unknown as Dependent<SetOf<T, Min>>
}

/**
 * Describes how the super and sub sets are generated.
 *
 * @group Arbitrary
 */
export interface SubsuperGenerator<T> {
    minLength: number
    maxLength: number
    size: ArbitrarySize
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
    constraints: MaybePartial<SubsuperGenerator<T>> = {},
): Dependent<[subset: T[], superset: T[], complement: T[]]> {
    const { minLength = 0, maxLength, eq, size } = constraints
    const sub = set(arbitrary, { minLength, maxLength, eq, size })
    const complement = set(arbitrary, { minLength, maxLength, eq, size })
    const pair = tuple(sub, complement)
    return mapArbitrary(pair, ([xs, cs]) => {
        const superset = collect(unique(concat(xs, cs), eq))
        return [xs, superset, [...difference(superset, xs)]]
    })
}
