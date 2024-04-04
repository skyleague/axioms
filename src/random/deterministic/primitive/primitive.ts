import { arbitraryContext } from '../../arbitrary/context/context.js'
import type { Integrated } from '../../arbitrary/integrated/index.js'
import { mulberry32 } from '../../rng/mulberry32/index.js'
import { seederFromStr } from '../../rng/seed/index.js'
import { boolean } from '../../types/boolean/index.js'
import { float } from '../../types/float/index.js'
import { integer } from '../../types/integer/index.js'
import { objectHasher } from '../hash/index.js'

function deterministicValue<T>(arbitrary: Integrated<unknown, T>, ...seed: unknown[]): T {
    return arbitrary.sample(arbitraryContext({ rng: mulberry32(seederFromStr(objectHasher.hash(seed))) }))
}

export function deterministicInteger(...seed: unknown[]): number {
    return deterministicValue(integer(), seed)
}

export function deterministicFloat(...seed: unknown[]): number {
    return deterministicValue(float(), seed)
}

export function deterministicBoolean(...seed: unknown[]): boolean {
    return deterministicValue(boolean(), seed)
}
