import type { RandomGenerator } from '../../rng/index.js'
import { xoroshiro128plus } from '../../rng/index.js'

export interface ArbitraryContext {
    rng: RandomGenerator
    bias?: number | undefined
}

export type BiasedArbitraryContext = ArbitraryContext & {
    bias: number
}

export const defaultRng = xoroshiro128plus(BigInt(Math.round(new Date().getTime() * Math.random())))

export function arbitraryContext(context: Partial<ArbitraryContext> = {}): ArbitraryContext & { parametrized: false } {
    return {
        rng: defaultRng,
        parametrized: false,
        ...context,
    } as ArbitraryContext & { parametrized: false }
}
