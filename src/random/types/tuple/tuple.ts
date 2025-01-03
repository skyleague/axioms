import { type Arbitrary, type TypeOfArbitrary, interleave } from '../../arbitrary/arbitrary/arbitrary.js'
import type { ArbitrarySizeContext } from '../../arbitrary/context/context.js'
import { type Dependent, dependentArbitrary } from '../../arbitrary/dependent/dependent.js'

/**
 * It takes an arbitrary number of arbitraries and returns a new arbitrary that generates tuples of the
 * values generated by the input arbitraries.
 *
 * ### Example
 * ```ts
 * random(tuple(integer(), integer()))
 * // => [921604357, 511147728]
 *
 * random(tuple(integer(), integer()))
 * // => [922310816, 522685001]
 * ```
 *
 * @param xs - The array of arbitraries to interleave.
 * @returns A dependent arbitrary that is a tuple of the values of the arbitraries passed in.
 *
 * @group Arbitrary
 */
export function tuple<T extends Arbitrary<unknown>[]>(...xs: [...T]): Dependent<{ [K in keyof T]: TypeOfArbitrary<T[K]> }> {
    const supremumCardinality = xs.every((x) => x.supremumCardinality !== undefined)
        ? // biome-ignore lint/style/noNonNullAssertion: checked in the line above
          (ctx: ArbitrarySizeContext) => xs.reduce((acc, x) => acc * x.supremumCardinality!(ctx), 1)
        : undefined
    return dependentArbitrary((context) => interleave(...xs.map((x) => x.value(context))), { supremumCardinality }) as Dependent<{
        [K in keyof T]: TypeOfArbitrary<T[K]>
    }>
}
