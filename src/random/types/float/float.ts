import type { Tree } from '../../../algorithm/index.js'
import { expandTree, tree } from '../../../algorithm/index.js'
import type { RelaxedPartial } from '../../../type/index.js'
import type { ArbitraryContext, Integrated } from '../../arbitrary/index.js'
import { integratedArbitrary } from '../../arbitrary/index.js'
import { towardsf } from '../../arbitrary/shrink/shrink.js'

export interface FloatConstraints {
    min: number
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
 * Describes how floats are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface FloatGenerator {
    /**
     * The minimum value to generate.
     */
    min: number

    /**
     * Is the minimum value included in the generation.
     */
    minInclusive: boolean
    /**
     * The maximum value to generate (exclusive).
     */
    max: number

    /**
     * Is the maximum value included in the generation.
     */
    maxInclusive: boolean
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
export function float({
    min = -(2 ** 31),
    minInclusive = true,
    max = 2 ** 31,
    maxInclusive = true,
}: RelaxedPartial<FloatGenerator> = {}): Integrated<FloatConstraints, number> {
    // shift the min and max to the correct value
    if (!minInclusive) {
        min += Number.EPSILON
    }
    if (!maxInclusive) {
        max -= Number.EPSILON
    }

    if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
        throw new Error('The minimum value must be less than the maximum value, and be finite')
    }

    return integratedArbitrary({
        sample: sampleFloat,
        shrink: shrinkFloat,
        constraints: {
            min,
            max,
        },
    })
}
