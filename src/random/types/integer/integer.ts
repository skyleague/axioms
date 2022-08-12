import { expandTree, tree } from '../../../algorithm'
import type { Tree } from '../../../algorithm'
import type { RelaxedPartial } from '../../../type'
import { makeIntegrated, towards } from '../../arbitrary'
import type { ArbitraryContext, BiasedArbitraryContext, Integrated } from '../../arbitrary'
import { weightedChoice } from '../choice'

export interface IntegerConstraints {
    min: number
    max: number
}

const nearZeroBias = weightedChoice([
    [2, ({ logMin, logMax }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min: -logMin, max: logMax })],
    [1, ({ logMax, max }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min: max - logMax, max })],
    [1, ({ logMin, min }: IntegerConstraints & { logMin: number; logMax: number }) => ({ min, max: min + logMin })],
])

export function integerLogLike(v: number): number {
    return Math.floor(Math.log(v))
}

export function sampleInteger({ min, max }: IntegerConstraints, { rng }: ArbitraryContext): number {
    return Math.floor(rng.sample() * (max - min) + min)
}

export function biasInteger({ min, max }: IntegerConstraints, { rng, bias }: BiasedArbitraryContext): IntegerConstraints {
    if (min === max) {
        return { min, max }
    } else if (min < 0 && max > 0) {
        // min < 0 && max > 0
        const logMin = integerLogLike(-min) * bias
        const logMax = integerLogLike(max) * bias

        return nearZeroBias(rng.sample())({ min, max, logMin, logMax })
    }
    // // Either min < 0 && max <= 0
    // // Or min >= 0, so max >= 0
    const length = (max - min) * bias

    const choices = weightedChoice([
        [1, { min, max: Math.floor(min + length) }],
        [1, { min: Math.floor(max - length), max }],
    ])

    // const logGap = integerLogLike((max - min) as any) // max-min !== 0
    // const arbCloseToMin = new Ctor(min, max, min, (min as any) + logGap) // close to min
    // const arbCloseToMax = new Ctor(min, max, (max - logGap) as any, max) // close to max
    // return min < 0
    //     ? new BiasedNumericArbitrary(arbCloseToMax, arbCloseToMin) // max is closer to zero
    //     : new BiasedNumericArbitrary(arbCloseToMin, arbCloseToMax) // min is closer to zero
    return choices(rng.sample())
}

export function shrinkInteger({ min, max }: IntegerConstraints, x: number): Tree<number> {
    const destination = min <= 0 && max >= 0 ? 0 : min < 0 ? max : min
    return expandTree((v) => towards(v, destination), tree(x, [tree(destination)]))
}

export function integer(constraints: RelaxedPartial<IntegerConstraints> = {}): Integrated<IntegerConstraints, number> {
    const { min = -Math.pow(2, 31), max = Math.pow(2, 31) } = constraints

    return makeIntegrated({
        sample: sampleInteger,
        biased: biasInteger,
        shrink: shrinkInteger,
        constraints: {
            min,
            max,
        },
    })
}
