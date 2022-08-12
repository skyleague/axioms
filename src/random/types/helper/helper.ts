import { tree } from '../../../algorithm/tree'
import type { Maybe } from '../../../type/maybe'
import { Nothing } from '../../../type/maybe'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import type { Dependent } from '../../arbitrary/dependent'
import { makeDependent } from '../../arbitrary/dependent'
import { oneOfWeighted } from '../one-of'
export interface OptionGenerator {
    size: number
}

export function optional<T>(a: Arbitrary<T>, context: RelaxedPartial<OptionGenerator> = {}): Dependent<Maybe<T>> {
    const { size = 1 } = context
    const afreq = oneOfWeighted([2, constant(Nothing)], [size + 1, a])
    return makeDependent((ctx) => afreq.value(ctx))
}

export function partial<T>(a: Arbitrary<T>, context: RelaxedPartial<OptionGenerator> = {}): Dependent<T | undefined> {
    const { size = 1 } = context
    const afreq = oneOfWeighted([2, constant(undefined)], [size + 1, a])
    return makeDependent((ctx) => afreq.value(ctx))
}

export function nullable<T>(a: Arbitrary<T>, context: RelaxedPartial<OptionGenerator> = {}): Dependent<T | null> {
    const { size = 1 } = context
    const afreq = oneOfWeighted([2, constant(null)], [size + 1, a])
    return makeDependent((ctx) => afreq.value(ctx))
}

export function constant<T extends boolean | number | string | symbol>(x: T): Arbitrary<T>
export function constant<T>(x: T): Arbitrary<T>
export function constant<T>(x: T): Arbitrary<T> {
    return {
        value: () => tree(x, []),
    }
}
