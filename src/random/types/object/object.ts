import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { ArbitraryContext } from '../../arbitrary/context/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { constant } from '../helper/index.js'
import { tuple } from '../tuple/index.js'

/**
 * It takes an object of arbitraries and returns an arbitrary of an object of values.
 *
 * ### Example
 * ```ts
 * random(object({foo: integer()}))
 * // => {foo: 921604357}
 *
 * random(object({foo: integer()}))
 * // => {foo: 511147728}
 * ```
 *
 * @param properties - The properties of the arbitrary.
 * @param _constraints - The constraints used to generate arbitrary values.
 *
 * @returns An object with the same keys as the input object, but with the values being the return
 *          value of the value function of the input object.
 *
 * @group Arbitrary
 */
export function object<T extends Record<PropertyKey, Arbitrary<unknown>>>(
    properties: T,
): Dependent<{ [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never }> {
    const keys = Object.keys(properties)
    if (keys.length === 0) {
        return constant({}) as Dependent<{
            [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
        }>
    }

    const arbitraries = Object.values(properties)
    return tuple(...arbitraries).map((vs) => Object.fromEntries(vs.map((v, i) => [keys[i], v] as const))) as Dependent<{
        [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
    }>
}
