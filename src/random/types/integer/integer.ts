import type { Tree } from '../../../algorithm/index.js'
import type { RelaxedPartial } from '../../../type/index.js'
import { integratedArbitrary } from '../../arbitrary/index.js'
import type { ArbitraryContext, BiasedArbitraryContext, Integrated } from '../../arbitrary/index.js'
import { binarySearchTree } from '../../arbitrary/shrink/shrink.js'
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
    [3, ({ logMin, logMax }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min: -logMin, max: logMax })],
    [1, ({ logMax, max }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min: max - logMax, max })],
    [1, ({ logMin, min }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min, max: min + logMin })],
])

function integerLogLike(v: number): number {
    return Math.floor(Math.log2(v + 1))
}

function sampleInteger({ min, max }: IntegerConstraints, { rng }: ArbitraryContext): number {
    return Math.floor(rng.sample() * (max - min) + min)
}

function biasInteger({ min, max }: IntegerConstraints, { rng }: BiasedArbitraryContext): IntegerConstraints {
    if (min < 0 && max > 0) {
        // Both min and max are non-zero
        const logMin = integerLogLike(-min)
        const logMax = integerLogLike(max)

        return nearZeroBias(rng.sample())({ min, max, logMin, logMax })
    }
    // interval does not overlap with 0
    const length = integerLogLike(max - min)
    const closeToMin = { min, max: Math.floor(min + length) }
    const closeToMax = { min: Math.floor(max - length), max }
    const choices = weightedChoice(
        min < 0
            ? [
                  [2, closeToMax],
                  [1, closeToMin],
              ]
            : [
                  [2, closeToMin],
                  [1, closeToMax],
              ]
    )
    return choices(rng.sample())
}

function shrinkInteger({ min, max }: IntegerConstraints, x: number): Tree<number> {
    const destination = min <= 0 && max >= 0 ? 0 : min < 0 ? max : min
    return binarySearchTree(destination, x)
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
