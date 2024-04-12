import { mergeDeep } from '../../../object/internal/merge-deep/merge-deep.js'
import { omitUndefined } from '../../../object/omit/omit.js'
import type { UnionToIntersection } from '../../../types.js'
import type { Arbitrary, TypeOfArbitraries } from '../../arbitrary/arbitrary/arbitrary.js'
import type { Dependent } from '../../arbitrary/dependent/dependent.js'
import { tuple } from '../tuple/tuple.js'

/**
 * It takes an arbitrary number of arbitraries, and returns an arbitrary that generates objects that
 * are the result of merging all the objects generated by the input arbitraries.
 *
 * ### Example
 * ```ts
 * random(allOf(object({foo: string()}), object({bar: string()})))
 * // => {foo: "bar", bar: "foo"}
 * ```
 *
 * @param arbitraries - The arbitraries to merge.
 * @returns An arbitrary that generates a record of all the properties of the given arbitraries.
 *
 * @group Arbitrary
 */
export function allOf<T extends Arbitrary<Record<PropertyKey, unknown>>[]>(
    ...arbitraries: [...T]
): Dependent<UnionToIntersection<TypeOfArbitraries<T>>> {
    return tuple(...arbitraries).map((xs) => {
        let target = {}
        for (const x of xs) {
            if (x !== undefined && x !== null) {
                target = mergeDeep(omitUndefined(x), target)
            }
        }
        return target as UnionToIntersection<TypeOfArbitraries<T>>
    })
}
