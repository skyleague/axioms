import type { MaybePartial } from '../../../type/partial/partial.js'
import type { RandomGenerator } from '../../rng/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import type { AbsoluteSize } from '../arbitrary/size.js'

export interface ArbitrarySizeContext {
    size: AbsoluteSize
    depth: AbsoluteSize
}

export interface ArbitraryContext extends ArbitrarySizeContext {
    rng: RandomGenerator
    depthCounter: number
    bias?: number | undefined
    withDepth: <T>(fn: () => T) => T
}

export type BiasedArbitraryContext = ArbitraryContext & {
    bias: number
}

export const defaultRng = xoroshiro128plus(BigInt(Math.round(new Date().getTime() * Math.random())))

export function arbitraryContext({
    rng = defaultRng,
    size = 's',
    depth = 's',
    depthCounter = 0,
    ...rest
}: MaybePartial<ArbitraryContext> = {}): ArbitraryContext {
    const context = {
        rng,
        size,
        depth,
        depthCounter,
        ...rest,
        withDepth: <T>(fn: () => T): T => {
            context.depthCounter += 1
            const val = fn()
            context.depthCounter -= 1
            return val
        },
    } satisfies ArbitraryContext
    return context
}
