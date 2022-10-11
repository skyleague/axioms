import type { RandomGenerator } from '../../rng'
import { xoroshiro128plus } from '../../rng'

export interface ArbitraryContext {
    rng: RandomGenerator
    bias?: number | undefined
}

export type BiasedArbitraryContext = ArbitraryContext & {
    bias: number
}

export const defaultRng = xoroshiro128plus(BigInt(new Date().getTime()))
export function makeContext(context: Partial<ArbitraryContext> = {}): ArbitraryContext & { parametrized: false } {
    return {
        rng: defaultRng,
        parametrized: false,
        ...context,
    } as ArbitraryContext & { parametrized: false }
}
