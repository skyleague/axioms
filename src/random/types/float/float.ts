import type { Tree } from '../../../algorithm'
import { expandTree, tree } from '../../../algorithm'
import type { RelaxedPartial } from '../../../type'
import type { ArbitraryContext, Integrated } from '../../arbitrary'
import { integratedArbitrary, towardsf } from '../../arbitrary'

/**
 * Describes how floats are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface FloatConstraints {
    /**
     * The minimum value to generate.
     */
    min: number
    /**
     * The maximum value to generate.
     */
    max: number
}

function sampleFloat({ min, max }: FloatConstraints, { rng }: ArbitraryContext): number {
    return rng.sample() * (max - min) + min
}

function shrinkFloat({ min, max }: FloatConstraints, x: number): Tree<number> {
    const destination = min <= 0 && max >= 0 ? 0 : min < 0 ? max : min
    return expandTree((v) => towardsf(destination, v), tree(x, [tree(destination)]))
}

/**
 * It returns an arbitrary that generates a random floating point number between -2,147,483,648 and
 * 2,147,483,647.
 *
 * ### Example
 * ```ts
 * random(float())
 * // => 3.158
 *
 * random(float())
 * // => 552579827.575685
 * ```
 *
 * @param constraints - The constraints used to generate arbitrary values.
 * @returns An arbitrary that generates a random float between -2^31 and 2^31
 *
 * @group Arbitrary
 */
export function float(constraints: RelaxedPartial<FloatConstraints> = {}): Integrated<FloatConstraints, number> {
    const { min = -Math.pow(2, 31), max = Math.pow(2, 31) } = constraints

    return integratedArbitrary({
        sample: sampleFloat,
        shrink: shrinkFloat,
        constraints: {
            min,
            max,
        },
    })
}
