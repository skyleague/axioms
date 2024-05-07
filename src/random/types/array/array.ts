import type { Tree } from '../../../algorithm/tree/tree.js'
import { isFailure } from '../../../guard/is-failure/is-failure.js'
import type { MaybePartial } from '../../../type/partial/partial.js'
import type { Try } from '../../../type/try/try.js'
import type { ReadonlyTuple } from '../../../types.js'
import { interleaveList } from '../../arbitrary/arbitrary/arbitrary.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import { type ArbitrarySize, maxLengthArbitrary } from '../../arbitrary/arbitrary/size.js'
import { type ArbitraryContext, type ArbitrarySizeContext, arbitraryContext } from '../../arbitrary/context/context.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { integer } from '../integer/integer.js'

export type ArrayOf<T, Min extends number> = Min extends 0 | 1 | 2 | 3 | 4 ? [...ReadonlyTuple<T, Min>, ...T[]] : T[]

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

    size?: ArbitrarySize
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
 * @param constraints - MaybePartial<ArrayGenerator<T>>
 * @returns An arbitrary that generates a record of all the properties of the given arbitraries.
 *
 * @group Arbitrary
 */
export function array<T, Min extends number = number>(
    arbitrary: Arbitrary<T>,
    constraints: MaybePartial<ArrayGenerator<T, Min>> = {},
): Dependent<ArrayOf<T, Min>> {
    const { minLength = 0, maxLength } = constraints

    const inferMaxLength = (ctx: ArbitrarySizeContext) =>
        maxLengthArbitrary({
            context: ctx,
            size: constraints.size,
            minLength,
            maxLength,
        })

    const { supremumCardinality } = arbitrary
    const aList = dependentArbitrary(
        (ctx) => {
            const max = inferMaxLength(ctx)
            const aint = integer({ min: minLength, max: Math.ceil(max) })
            return interleaveList(
                (() => {
                    const { bias } = ctx
                    let biasedValue = () => arbitrary.value(ctx)
                    let size: number
                    if (bias !== undefined) {
                        const p0 = ctx.rng.sample() > bias
                        const p1 = ctx.rng.sample() > bias
                        size = aint.sample(arbitraryContext({ ...ctx, bias: p0 ? bias : undefined }))
                        biasedValue = () => {
                            const oldBias = ctx.bias
                            ctx.bias = p1 ? bias : undefined
                            const val = arbitrary.value(ctx)
                            ctx.bias = oldBias
                            return val
                        }
                    } else {
                        size = aint.sample(ctx)
                    }

                    const xs: Tree<T>[] = []
                    while (xs.length < size) {
                        xs.push(biasedValue())
                    }
                    return xs
                })(),
                {
                    minLength,
                },
            )
        },
        {
            supremumCardinality:
                supremumCardinality !== undefined ? (ctx) => inferMaxLength(ctx) * supremumCardinality(ctx) : undefined,
        },
    )
    return aList as Dependent<ArrayOf<T, Min>>
}

export interface ArrayWithGenerator<T, Min extends number> extends ArrayGenerator<T, Min> {
    cardinality?: (x: number, ctx: ArbitraryContext) => number
}

/**
 * @experimental
 */
export function arrayWith<T, Min extends number = number>(
    predicate: (
        x: T,
        xs: T[],
        skippedInRow: number,
        constraints: Pick<ArrayGenerator<T, number>, 'minLength' | 'maxLength'>,
    ) => Try<boolean>,
    arbitrary: Arbitrary<T>,
    constraints: MaybePartial<ArrayWithGenerator<T, Min>> = {},
): Dependent<ArrayOf<T, Min>> {
    const { minLength = 0, maxLength, cardinality } = constraints

    const inferMaxLength = (ctx: ArbitraryContext) =>
        maxLengthArbitrary({
            context: ctx,
            size: constraints.size,
            minLength,
            maxLength,
        })

    return dependentArbitrary((ctx) => {
        const max = inferMaxLength(ctx)
        const newConstraints: Pick<ArrayGenerator<T, number>, 'minLength' | 'maxLength'> = {
            ...constraints,
            minLength: minLength,
            maxLength: maxLength ?? max,
        }
        const aint = integer({
            min: minLength,
            max: cardinality !== undefined ? cardinality(Math.ceil(max), ctx) : Math.ceil(max),
        })
        return interleaveList(
            (() => {
                const { bias } = ctx
                let biasedValue = () => arbitrary.value(ctx)
                let size: number
                if (bias !== undefined) {
                    const p0 = ctx.rng.sample() > bias
                    const p1 = ctx.rng.sample() > bias
                    size = aint.sample(arbitraryContext({ ...ctx, bias: p0 ? bias : undefined }))
                    if (p0 && p1) {
                        // small array with small values
                        biasedValue = () => arbitrary.value(arbitraryContext({ ...ctx, bias }))
                    } else {
                        biasedValue = () => arbitrary.value(arbitraryContext({ ...ctx, bias: p1 ? bias : undefined }))
                    }
                } else {
                    size = aint.sample(ctx)
                }

                const xs: Tree<T>[] = []
                const vals: T[] = []

                let skippedInRow = 0
                while (xs.length !== size) {
                    const x = biasedValue()
                    const shouldAdd = predicate(x.value, vals, skippedInRow, newConstraints)
                    if (isFailure(shouldAdd)) {
                        // just accept the total array
                        if (xs.length >= minLength) {
                            break
                        }
                        throw shouldAdd
                    }

                    if (shouldAdd) {
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
            },
        )
    }) as Dependent<ArrayOf<T, Min>>
}
