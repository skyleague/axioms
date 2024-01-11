import type { Tree } from '../../../algorithm/tree/tree.js'
import { unique } from '../../../iterator/index.js'
import type { RelaxedPartial } from '../../../type/partial/index.js'
import type { BuildTuple } from '../../../type/tuple/tuple.js'
import { interleaveList } from '../../arbitrary/arbitrary/arbitrary.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { integer } from '../integer/integer.js'

export type ArrayOf<T, Min extends number> = Min extends 0 | 1 | 2 | 3 | 4 ? [...BuildTuple<Min, T>, ...T[]] : T[]

/**
 * Describes how arrays are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface ArrayGenerator<T, Min extends number> {
    /**
     * The minimum length of array to generate.
     */
    minLength: Min
    /**
     * The maximum length of array to generate.
     */
    maxLength: number
    /**
     * Controls whether all items should be considered unique.
     */
    uniqueItems: boolean
    /**
     * Equality operator that is used to detect duplicate items.
     */
    equals?: (a: T, b: T) => boolean
}

/**
 * It generates an array of arbitrary values, with a length between `minLength` and `maxLength`, and
 * with unique items if `uniqueItems` is true.
 *
 * ### Example
 * ```ts
 * random(array(integer()))
 * // => [1, 3, 4]
 * ```
 *
 * @param arbitrary - The arbitraries to create an array of.
 * @param context - RelaxedPartial<ArrayGenerator<T>>
 * @returns An arbitrary that generates a record of all the properties of the given arbitraries.
 *
 * @group Arbitrary
 */
export function array<T, Min extends number = number>(
    arbitrary: Arbitrary<T>,
    context: RelaxedPartial<ArrayGenerator<T, Min>> = {}
): Dependent<ArrayOf<T, Min>> {
    const { minLength = 0, maxLength, uniqueItems = false } = context
    const aint = integer({ min: minLength, max: maxLength ?? minLength * 1.6 + 10 })
    const aList = dependentArbitrary((ctx) =>
        interleaveList(
            (() => {
                const { bias } = ctx
                let biasedValue = () => arbitrary.value(ctx)
                let size: number
                if (bias !== undefined) {
                    const p0 = ctx.rng.sample() > bias
                    const p1 = ctx.rng.sample() > bias
                    size = aint.sample({ ...ctx, bias: p0 ? bias : undefined })
                    biasedValue = () => arbitrary.value({ ...ctx, bias: p1 ? bias : undefined })
                } else {
                    size = aint.sample(ctx)
                }
                const xs: Tree<T>[] = []
                while (xs.length !== size) {
                    xs.push(biasedValue())
                }
                return xs
            })(),
            {
                minLength,
            }
        )
    )
    if (uniqueItems) {
        return aList.map((x) => [...unique(x)]).filter((x) => x.length >= minLength) as Dependent<ArrayOf<T, Min>>
    }
    return aList as Dependent<ArrayOf<T, Min>>
}

/**
 * @experimental
 */
export function arrayWith<T, Min extends number = number>(
    predicate: (x: T, xs: T[], skippedInRow: number) => boolean,
    arbitrary: Arbitrary<T>,
    context: RelaxedPartial<ArrayGenerator<T, Min>> = {}
): Dependent<ArrayOf<T, Min>> {
    const { minLength = 0, maxLength } = context
    const aint = integer({ min: minLength, max: maxLength ?? minLength * 1.6 + 10 })
    return dependentArbitrary((ctx) =>
        interleaveList(
            (() => {
                const { bias } = ctx
                let biasedValue = () => arbitrary.value(ctx)
                let size: number
                if (bias !== undefined) {
                    const p0 = ctx.rng.sample() > bias
                    const p1 = ctx.rng.sample() > bias
                    size = aint.sample({ ...ctx, bias: p0 ? bias : undefined })
                    if (p0 && p1) {
                        // small array with small values
                        biasedValue = () => arbitrary.value({ ...ctx, bias })
                    } else {
                        biasedValue = () => arbitrary.value({ ...ctx, bias: p1 ? bias : undefined })
                    }
                } else {
                    size = aint.sample(ctx)
                }

                const xs: Tree<T>[] = []
                const vals: T[] = []

                let skippedInRow = 0
                while (xs.length !== size) {
                    const x = biasedValue()
                    if (predicate(x.value, vals, skippedInRow)) {
                        xs.push(x)
                        vals.push(x.value)
                        skippedInRow = 0
                    } else {
                        skippedInRow += 1
                    }
                }

                return xs
            })(),
            {
                minLength,
            }
        )
    ) as Dependent<ArrayOf<T, Min>>
}
