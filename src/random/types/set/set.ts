import type { Tree } from '../../../algorithm/tree'
import { filterTree } from '../../../algorithm/tree'
import { collect } from '../../../array/collect'
import { concat } from '../../../iterator'
import { equal } from '../../../iterator/equal'
import { unique } from '../../../iterator/unique'
import { difference } from '../../../set/difference'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import { makeDependent } from '../../arbitrary/dependent'
import { InfeasibleTree } from '../../arbitrary/shrink'
import { mapArbitrary } from '../../arbitrary/transform'
import { arrayWith } from '../array'
import { tuple } from '../tuple'

function uniqueArbitraryTree<T>(vals: Tree<T[]>, eq: (a: T, b: T) => boolean): Tree<T[]> {
    return filterTree((x) => collect(unique(x, eq)).length === x.length, vals)
}

export interface SetGenerator<T> {
    minLength: number
    maxLength: number
    useBias: boolean
    eq: (a: T, b: T) => boolean
}

export function set<T>(arbitrary: Arbitrary<T>, context: RelaxedPartial<SetGenerator<T>> = {}): Arbitrary<T[]> {
    const { minLength = 0, maxLength = 10, useBias = false, eq = equal } = context
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
    return makeDependent((ctx) => {
        // make sure we don't shrink to an array with duplicates
        return uniqueArbitraryTree<T>(aarray.value({ ...ctx, bias: useBias ? ctx.bias : undefined }), eq)
    })
}

export interface SubsuperGenerator<T> {
    minLength: number
    maxLength: number
    eq: (a: T, b: T) => boolean
}

export function subsuper<T>(
    arbitrary: Arbitrary<T>,
    context: RelaxedPartial<SubsuperGenerator<T>> = {}
): Arbitrary<[sub: T[], superset: T[], complement: T[]]> {
    const { minLength = 0, maxLength = 10, eq = equal } = context
    const sub = set(arbitrary, { minLength, maxLength, eq })
    const complement = set(arbitrary, { minLength, maxLength, eq })
    const pair = tuple(sub, complement)
    return mapArbitrary(([xs, cs]) => {
        const superset = collect(unique(concat(xs, cs), eq))
        return [xs, superset, [...difference(superset, xs)]]
    }, pair)
}
