import type { Tree } from '../../../algorithm'
import { tree } from '../../../algorithm'
import type { ArbitraryContext, Integrated } from '../../arbitrary'
import { makeIntegrated } from '../../arbitrary'

export interface BooleanConstraints {}

export function sampleBoolean(_: BooleanConstraints, { rng }: ArbitraryContext): boolean {
    return rng.sample() < 0.5
}

export function shrinkBoolean(_: BooleanConstraints, x: boolean): Tree<boolean> {
    return { value: x, children: x ? [tree(false)] : [] }
}

export function boolean(constraints: Partial<BooleanConstraints> = {}): Integrated<BooleanConstraints, boolean> {
    return makeIntegrated({ sample: sampleBoolean, shrink: shrinkBoolean, constraints })
}
