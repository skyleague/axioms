import type { Arbitrary, TypeOfArbitraries } from '../../arbitrary/arbitrary/index.js'
import { depthArbitrary, type ArbitrarySize } from '../../arbitrary/arbitrary/size.js'
import { dependentArbitrary } from '../../arbitrary/dependent/dependent.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { weightedChoice } from '../choice/choice.js'
import { float } from '../float/float.js'

export interface OneOfConstraints {
    depth?: ArbitrarySize
}

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
    return oneOfWeighted(...arbitraries.map((x): [number, Arbitrary<unknown>] => [1, x]))
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
export function oneOfWeighted<T extends readonly [number, Arbitrary<unknown>][]>(
    ...arbitraries: [...T]
): Dependent<ReturnType<[...T][number][1]['value']>['value']> {
    const choices = weightedChoice(arbitraries)
    return dependentArbitrary((ctx) => {
        const selector = float({ min: 0, max: 1 })

        return ctx.withDepth(() => {
            const x = selector.sample(ctx)
            const depth = depthArbitrary({ context: ctx })
            const addedZeroWeight = Math.floor(Math.pow(1 + depth, ctx.depthCounter)) - 1
            return choices(x * (1 + addedZeroWeight) - addedZeroWeight).value(ctx)
        })
    })
}
