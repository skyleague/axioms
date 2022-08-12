import type { Integrated } from '../../arbitrary/integrated'
import { mulberry32 } from '../../rng/mulberry32'
import { seederFromStr } from '../../rng/seed'
import { boolean } from '../../types/boolean'
import { float } from '../../types/float'
import { integer } from '../../types/integer'
import { objectHasher } from '../hash'

function deterministicValue<T>(arbitrary: Integrated<unknown, T>, seed: unknown): T {
    return arbitrary.sample({ rng: mulberry32(seederFromStr(objectHasher.hash(seed))) })
}

export function deterministicInteger(seed: unknown): number {
    return deterministicValue(integer(), seed)
}

export function deterministicFloat(seed: unknown): number {
    return deterministicValue(float(), seed)
}

export function deterministicBoolean(seed: unknown): boolean {
    return deterministicValue(boolean(), seed)
}
