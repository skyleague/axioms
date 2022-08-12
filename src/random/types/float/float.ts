import type { Tree } from '../../../algorithm'
import { expandTree, tree } from '../../../algorithm'
import type { RelaxedPartial } from '../../../type'
import type { ArbitraryContext, Integrated } from '../../arbitrary'
import { makeIntegrated, towardsf } from '../../arbitrary'

export interface FloatConstraints {
    min: number
    max: number
}

export function sampleFloat({ min, max }: FloatConstraints, { rng }: ArbitraryContext): number {
    return rng.sample() * (max - min) + min
}

export function shrinkFloat({ min, max }: FloatConstraints, x: number): Tree<number> {
    const destination = min <= 0 && max >= 0 ? 0 : min < 0 ? max : min
    return expandTree((v) => towardsf(destination, v), tree(x, [tree(destination)]))
}

export function float(constraints: RelaxedPartial<FloatConstraints> = {}): Integrated<FloatConstraints, number> {
    const { min = -Math.pow(2, 31), max = Math.pow(2, 31) } = constraints

    return makeIntegrated({
        sample: sampleFloat,
        shrink: shrinkFloat,
        constraints: {
            min,
            max,
        },
    })
}
