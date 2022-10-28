import { mergeDeep, omitUndefined } from '../../../object'
import type { UnionToIntersection } from '../../../type/set'
import type { Arbitrary, TypeOfArbitraries } from '../../arbitrary/arbitrary'
import type { Dependent } from '../../arbitrary/dependent'
import { tuple } from '../tuple'

export function allOf<T extends Arbitrary<Record<PropertyKey, unknown>>[]>(
    ...arbitraries: [...T]
): Dependent<UnionToIntersection<TypeOfArbitraries<T>>> {
    return tuple(...arbitraries).map((xs) => {
        let target = {}
        for (const x of xs) {
            target = mergeDeep(omitUndefined(x), target)
        }
        return target as UnionToIntersection<TypeOfArbitraries<T>>
    })
}
