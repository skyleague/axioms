import { tree } from '../../../algorithm/tree'
import type { Maybe } from '../../../type/maybe'
import { Nothing } from '../../../type/maybe'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { oneOfWeighted } from '../one-of'

export interface OptionalGenerator<N = Nothing> {
    size: number
    symbol: N
}

export function optional<T, O = Nothing>(
    a: Arbitrary<T>,
    context: RelaxedPartial<OptionalGenerator<O>> = {}
): Nothing extends O ? Dependent<Maybe<T>> : Dependent<O | T> {
    const { size = 1 } = context
    const afreq = oneOfWeighted([2, constant('symbol' in context ? context.symbol : Nothing)], [size + 1, a])
    return dependentArbitrary((ctx) => afreq.value(ctx)) as Nothing extends O ? Dependent<Maybe<T>> : Dependent<O | T>
}

export interface PartialGenerator {
    size: number
}

export function partial<T>(a: Arbitrary<T>, context: RelaxedPartial<PartialGenerator> = {}): Dependent<T | undefined> {
    return optional(a, { symbol: undefined, ...context })
}

export interface NullableGenerator {
    size: number
}

export function nullable<T>(a: Arbitrary<T>, context: RelaxedPartial<NullableGenerator> = {}): Dependent<T | null> {
    return optional(a, { symbol: null, ...context })
}

export function constant<T extends boolean | number | string | symbol>(x: T): Arbitrary<T>
export function constant<T>(x: T): Arbitrary<T>
export function constant<T>(x: T): Arbitrary<T> {
    return {
        value: () => tree(x, []),
    }
}
