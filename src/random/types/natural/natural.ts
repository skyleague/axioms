import type { RelaxedPartial } from '../../../type/partial/index.js'
import type { Integrated } from '../../arbitrary/integrated/index.js'
import { integer } from '../integer/index.js'

/**
 * Describes how natural numbers are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface NaturalConstraints {
    /**
     * The minimum value to generate.
     */
    min: number
    /**
     * The maximum value to generate.
     */
    max: number
}

/**
 * It returns an arbitrary that generates natural numbers between 0 and 2^31.
 *
 * ### Example
 * ```ts
 * random(natural())
 * // => 123
 * ```
 *
 * @param constraints - The constraints used to generate arbitrary values.
 * @returns An arbitrary that generates natural numbers.
 *
 * @group Arbitrary
 */
export function natural(constraints: RelaxedPartial<NaturalConstraints> = {}): Integrated<NaturalConstraints, number> {
    return integer({ min: 0, ...constraints })
}
