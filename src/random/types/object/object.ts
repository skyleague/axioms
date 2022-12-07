import { mapTree } from '../../../algorithm/tree'
import { zip } from '../../../array/zip'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import type { ArbitraryContext } from '../../arbitrary/context'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { constant } from '../helper'
import { tuple } from '../tuple'

export interface ObjectGenerator {}

/**
 * It takes an object of arbitraries and returns an arbitrary of an object of values.
 *
 * ### Example
 * ```ts
 * random(natural())
 * // => 123
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
    _constraints: Partial<ObjectGenerator> = {}
): Dependent<{ [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never }> {
    const keys = Object.keys(properties)
    if (keys.length === 0) {
        return dependentArbitrary((context) => constant({}).value(context)) as Dependent<{
            [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
        }>
    }

    const arbitraries = Object.values(properties)
    const avalue = tuple(...arbitraries)
    return dependentArbitrary((context) => mapTree(avalue.value(context), (v) => Object.fromEntries(zip(keys, v)))) as Dependent<{
        [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
    }>
}
