import { replicate, replicateWithMemory } from '../../../iterator/replicate'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import { interleaveList } from '../../arbitrary/arbitrary'
import { makeDependent } from '../../arbitrary/dependent'
import { integer } from '../integer/integer'

export interface ArrayGenerator<T> {
    minLength: number
    maxLength: number
    equals?: (a: T, b: T) => boolean
}

export function array<T>(arbitrary: Arbitrary<T>, context: RelaxedPartial<ArrayGenerator<T>> = {}): Arbitrary<T[]> {
    const { minLength = 0, maxLength } = context
    const aint = integer({ min: minLength, max: maxLength ?? minLength * 1.6 + 10 })
    return makeDependent((ctx) =>
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
}

export function arrayWith<T>(
    predicate: (x: T, xs: T[], skippedInRow: number) => boolean,
    arbitrary: Arbitrary<T>,
    context: RelaxedPartial<ArrayGenerator<T>> = {}
): Arbitrary<T[]> {
    const { minLength = 0, maxLength } = context
    const aint = integer({ min: minLength, max: maxLength ?? minLength * 1.6 + 10 })
    return makeDependent((ctx) =>
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
