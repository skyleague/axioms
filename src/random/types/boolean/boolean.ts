import type { Tree } from '../../../algorithm/index.js'
import { tree } from '../../../algorithm/index.js'
import type { ArbitraryContext, Integrated } from '../../arbitrary/index.js'
import { integratedArbitrary } from '../../arbitrary/index.js'

function sampleBoolean(_: undefined, { rng }: ArbitraryContext): boolean {
    return rng.sample() < 0.5
}

function shrinkBoolean(_: undefined, x: boolean): Tree<boolean> {
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
export function boolean(): Integrated<undefined, boolean> {
    return integratedArbitrary({
        sample: sampleBoolean,
        shrink: shrinkBoolean,
        constraints: undefined,
        supremumCardinality: () => 2,
    })
}
