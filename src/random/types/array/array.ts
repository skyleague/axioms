import { unique } from '../../../iterator'
import { replicate, replicateWithMemory } from '../../../iterator/replicate'
import type { RelaxedPartial } from '../../../type/partial'
import { filterArbitrary, mapArbitrary } from '../../arbitrary'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import { interleaveList } from '../../arbitrary/arbitrary'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { integer } from '../integer/integer'

/**
 * Describes how arrays are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface ArrayGenerator<T> {
    /**
     * The minimum length of array to generate.
     */
    minLength: number
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
export function array<T>(arbitrary: Arbitrary<T>, context: RelaxedPartial<ArrayGenerator<T>> = {}): Dependent<T[]> {
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
                return replicate(biasedValue, size)
            })(),
            {
                minLength,
            }
        )
    )
    if (uniqueItems) {
        return filterArbitrary(
            mapArbitrary(aList, (x) => [...unique(x)]),
            (x) => x.length >= minLength
        )
    }
    return aList
}

/**
 * @experimental
 */
export function arrayWith<T>(
    predicate: (x: T, xs: T[], skippedInRow: number) => boolean,
    arbitrary: Arbitrary<T>,
    context: RelaxedPartial<ArrayGenerator<T>> = {}
): Dependent<T[]> {
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
                return replicateWithMemory(
                    biasedValue,
                    (x, xs, _i, skippedInRow) =>
                        predicate(
                            x.value,
                            xs.map((v) => v.value),
                            skippedInRow
                        ),
                    size
                )
            })(),
            {
                minLength,
            }
        )
    )
}
