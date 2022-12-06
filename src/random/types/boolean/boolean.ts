import type { Tree } from '../../../algorithm'
import { tree } from '../../../algorithm'
import type { ArbitraryContext, Integrated } from '../../arbitrary'
import { integratedArbitrary } from '../../arbitrary'

export interface BooleanConstraints {}

function sampleBoolean(_: BooleanConstraints, { rng }: ArbitraryContext): boolean {
    return rng.sample() < 0.5
}

function shrinkBoolean(_: BooleanConstraints, x: boolean): Tree<boolean> {
    return { value: x, children: x ? [tree(false)] : [] }
}

/**
 * It returns an arbitrary that generates a boolean value.
 *
 * ### Example
 * ```ts
 * random(boolean())
 * // => true
 * ```
 *
 * @param constraints - The constraints.
 * @returns An arbitrary that generates a boolean value.
 *
 * @group Arbitrary
 */
export function boolean(constraints: Partial<BooleanConstraints> = {}): Integrated<BooleanConstraints, boolean> {
    return integratedArbitrary({ sample: sampleBoolean, shrink: shrinkBoolean, constraints })
}
