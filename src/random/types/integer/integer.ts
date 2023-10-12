import { expandTree, tree } from '../../../algorithm/index.js'
import type { Tree } from '../../../algorithm/index.js'
import type { RelaxedPartial } from '../../../type/index.js'
import { integratedArbitrary, towards } from '../../arbitrary/index.js'
import type { ArbitraryContext, BiasedArbitraryContext, Integrated } from '../../arbitrary/index.js'
import { weightedChoice } from '../choice/index.js'

/**
 * Describes how integers are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface IntegerConstraints {
    /**
     * The minimum value to generate.
     */
    min: number
    /**
     * The maximum value to generate.
     */
    max: number
}

const nearZeroBias = weightedChoice([
    [2, ({ logMin, logMax }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min: -logMin, max: logMax })],
    [1, ({ logMax, max }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min: max - logMax, max })],
    [1, ({ logMin, min }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min, max: min + logMin })],
])

function integerLogLike(v: number): number {
    return Math.floor(Math.log(v))
}

function sampleInteger({ min, max }: IntegerConstraints, { rng }: ArbitraryContext): number {
    return Math.floor(rng.sample() * (max - min) + min)
}

function biasInteger({ min, max }: IntegerConstraints, { rng, bias }: BiasedArbitraryContext): IntegerConstraints {
    if (min === max) {
        return { min, max }
    } else if (min < 0 && max > 0) {
        // Both min and max are non-zero
        const logMin = integerLogLike(-min) * bias
        const logMax = integerLogLike(max) * bias

        return nearZeroBias(rng.sample())({ min, max, logMin, logMax })
    }
    // Either min or max is zero

    const length = (max - min) * bias
    const choices = weightedChoice([
        [1, { min, max: Math.floor(min + length) }],
        [1, { min: Math.floor(max - length), max }],
    ])
    return choices(rng.sample())
}

function shrinkInteger({ min, max }: IntegerConstraints, x: number): Tree<number> {
    const destination = min <= 0 && max >= 0 ? 0 : min < 0 ? max : min
    return expandTree((v) => towards(v, destination), tree(x, [tree(destination)]))
}

/**
 * It returns an arbitrary that generates integers between -2^31 and 2^31.
 *
 * ### Example
 * ```ts
 * random(integer())
 * // => 123
 * ```
 *
 * @param constraints - The constraints used to generate arbitrary values.
 * @returns An arbitrary that generates integers.
 *
 * @group Arbitrary
 */
export function integer(constraints: RelaxedPartial<IntegerConstraints> = {}): Integrated<IntegerConstraints, number> {
    const { min = -Math.pow(2, 31), max = Math.pow(2, 31) } = constraints

    return integratedArbitrary({
        sample: sampleInteger,
        biased: biasInteger,
        shrink: shrinkInteger,
        constraints: {
            min,
            max,
        },
    })
}
