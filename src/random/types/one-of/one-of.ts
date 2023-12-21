import { sum } from '../../../array/sum/index.js'
import type { Arbitrary, TypeOfArbitraries } from '../../arbitrary/arbitrary/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { weightedChoice } from '../choice/choice.js'
import { integer } from '../integer/integer.js'

/**
 * It generates an integer between 0 and the number of arbitraries passed in, and then generates a
 * value from the corresponding arbitrary.
 *
 * ### Example
 * ```ts
 * random(oneOf(object({foo: string()}), object({bar: string()})))
 * // => {foo: "bar"}
 *
 * random(oneOf(object({foo: string()}), object({bar: string()})))
 * // => {bar: "foo"}
 * ```
 *
 * @param arbitraries - The arbitraries to select one of.
 * @returns An arbitrary that is randomly chosen from the list.
 *
 * @group Arbitrary
 */
export function oneOf<T extends Arbitrary<unknown>[]>(...arbitraries: [...T]): Dependent<TypeOfArbitraries<T>> {
    return integer({ min: 0, max: arbitraries.length }).chain((i) => {
        return arbitraries[i]
    })
}

/**
 * It generates an integer between 0 and the number of arbitraries passed in, and then generates a
 * weighted value from the corresponding arbitrary.
 *
 * ### Example
 * ```ts
 * random(oneOf([2, object({foo: string()})], [1, object({bar: string()})]))
 * // => {foo: "bar"}
 *
 * random(oneOf([2, object({foo: string()})], [1, object({bar: string()})]))
 * // => {foo: "bar"}
 *
 * random(oneOf([2, object({foo: string()})], [1, object({bar: string()})]))
 * // => {bar: "foo"}
 * ```
 *
 * @param arbitraries - The arbitraries to select one of.
 * @returns An arbitrary that is randomly chosen from the weighted list.
 *
 * @group Arbitrary
 */
export function oneOfWeighted<T extends [number, Arbitrary<unknown>][]>(
    ...arbitraries: [...T]
): Dependent<ReturnType<[...T][number][1]['value']>['value']> {
    const total = sum(arbitraries.map((a) => a[0]))
    const aint = integer({ min: 0, max: total })
    const choices = weightedChoice(arbitraries)
    return dependentArbitrary((context) => {
        return choices(aint.sample(context)).value(context)
    })
}
