import { tree } from '../../../algorithm/tree/index.js'
import type { Maybe } from '../../../type/maybe/index.js'
import { Nothing } from '../../../type/maybe/index.js'
import type { RelaxedPartial } from '../../../type/partial/index.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { oneOfWeighted } from '../one-of/index.js'

export interface OptionalGenerator<N = Nothing> {
    size: number
    symbol: N
}

/**
 * `optional` takes an arbitrary and returns an arbitrary that is either the original arbitrary or the
 * optional symbol
 *
 * ### Example
 * ```ts
 * random(optional(integer()))
 * // => Nothing
 *
 * random(optional(integer()))
 * // => 1234
 *
 * random(optional(integer({symbol: undefined})))
 * // => undefined
 * ```
 *
 * @param arbitrary - The arbitrary to make optional.
 * @param constraints - The constraints used to generate arbitrary values.
 * @returns An optional version of the given arbitrary.
 *
 * @group Arbitrary
 */
export function optional<T, O = Nothing>(
    arbitrary: Arbitrary<T>,
    constraints: RelaxedPartial<OptionalGenerator<O>> = {}
): Nothing extends O ? Dependent<Maybe<T>> : Dependent<O | T> {
    const { size = 1 } = constraints
    const afreq = oneOfWeighted([2, constant('symbol' in constraints ? constraints.symbol : Nothing)], [size + 1, arbitrary])
    return dependentArbitrary((ctx) => afreq.value(ctx)) as Nothing extends O ? Dependent<Maybe<T>> : Dependent<O | T>
}

export interface PartialGenerator {
    size: number
}

/**
 * It takes an arbitrary and returns a new arbitrary that can generate undefined values.
 *
 * ### Example
 * ```ts
 * random(partial(integer()))
 * // => undefined
 *
 * random(partial(integer()))
 * // => 1234
 *
 * random(partial(integer({symbol: Nothing})))
 * // => Nothing
 * ```
 *
 * @param arbitrary - The arbitrary to make partial.
 * @param constraints - The constraints used to generate arbitrary values.
 * @returns A partial version of the given arbitrary.
 *
 * @group Arbitrary
 * @experimental
 */
export function partial<T>(
    arbitrary: Arbitrary<T>,
    constraints: RelaxedPartial<PartialGenerator> = {}
): Dependent<T | undefined> {
    return optional(arbitrary, { symbol: undefined, ...constraints })
}

export interface NullableGenerator {
    size: number
}

/**
 * It takes an arbitrary and returns a new arbitrary that can generate null values.
 *
 * ### Example
 * ```ts
 * random(nullable(integer()))
 * // => null
 *
 * random(nullable(integer()))
 * // => 1234
 *
 * random(nullable(integer({symbol: Nothing})))
 * // => Nothing
 * ```
 *
 * @param arbitrary - The arbitrary to make partial.
 * @param constraints - The constraints used to generate arbitrary values.
 * @returns An nullable version of the given arbitrary.
 *
 * @group Arbitrary
 */
export function nullable<T>(a: Arbitrary<T>, constraints: RelaxedPartial<NullableGenerator> = {}): Dependent<T | null> {
    return optional(a, { symbol: null, ...constraints })
}

/**
 * It takes a constant value and creates an arbitrary out of it.
 *
 * ### Example
 * ```ts
 * random(constant("foobar"))
 * // => "foobar"
 *
 * random(constant(1))
 * // => 1
 * ```
 *
 * @param x - The constant to make arbitrary.
 * @returns A constant arbitrary.
 *
 * @group Arbitrary
 */
export function constant<T extends boolean | number | string | symbol>(x: T): Arbitrary<T>
export function constant<T>(x: T): Arbitrary<T>
export function constant<T>(x: T): Arbitrary<T> {
    return {
        value: () => tree(x, []),
    }
}
