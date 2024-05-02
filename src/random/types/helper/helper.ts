import { memoize } from '../../../algorithm/memoize/memoize.js'
import type { Maybe } from '../../../type/maybe/index.js'
import { Nothing } from '../../../type/maybe/index.js'
import type { MaybePartial } from '../../../type/partial/partial.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/dependent.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { integer } from '../integer/integer.js'

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
    constraints: MaybePartial<OptionalGenerator<O>> = {},
): Nothing extends O ? Dependent<Maybe<T>> : Dependent<O | T> {
    return integer({ min: 0, max: 2 }).chain((i): Arbitrary<O | Nothing | undefined | T> => {
        if (i !== 1) {
            return constant('symbol' in constraints ? constraints.symbol : Nothing)
        }
        return arbitrary
    }) as Nothing extends O ? Dependent<Maybe<T>> : Dependent<O | T>
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
 * @deprecated
 */
export function partial<T>(arbitrary: Arbitrary<T>, constraints: MaybePartial<PartialGenerator> = {}): Dependent<T | undefined> {
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
export function nullable<T>(a: Arbitrary<T>, constraints: MaybePartial<NullableGenerator> = {}): Dependent<T | null> {
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
export function constant<const T>(x: T): Dependent<T> {
    return dependentArbitrary(() => ({ value: x, children: [] }), { supremumCardinality: () => 1 })
}

export function memoizeArbitrary<T>(arb: () => Arbitrary<T>): Dependent<T> {
    const memoizedArb = memoize(arb)
    return dependentArbitrary<T>((ctx) => memoizedArb().value(ctx))
}
