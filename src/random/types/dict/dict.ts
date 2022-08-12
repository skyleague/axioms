import { mapTree } from '../../../algorithm/tree'
import { isArray } from '../../../guard/is-array'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import { makeDependent } from '../../arbitrary/dependent'
import { propertyKey } from '../property-key'
import { set } from '../set'
import { tuple } from '../tuple'

export interface DictGenerator<T> {
    minLength: number
    maxLength: number
    eq: (a: T, b: T) => boolean
}

export function dict<T, K extends PropertyKey>(
    keyValue: Arbitrary<T> | [Arbitrary<K>, Arbitrary<T>],
    context: RelaxedPartial<DictGenerator<T>> = {}
): Arbitrary<Record<string, T>> {
    const { minLength = 0, maxLength = 10 } = context
    const [key, value] = isArray(keyValue) ? keyValue : [propertyKey(), keyValue]
    const aset = set(tuple(key, value), { eq: (a, b) => a[0] === b[0], minLength, maxLength })

    return makeDependent((ctx) => mapTree(aset.value(ctx), (kvs) => Object.fromEntries(kvs)))
}
