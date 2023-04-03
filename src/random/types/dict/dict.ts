import { mapTree } from '../../../algorithm/tree/index.js'
import { isArray } from '../../../guard/is-array/index.js'
import type { RelaxedPartial } from '../../../type/partial/index.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { set } from '../set/index.js'
import { string } from '../string/index.js'
import { tuple } from '../tuple/index.js'

export interface DictGenerator {
    minLength: number
    maxLength: number
}

/**
 * It returns an arbitrary that generates a dictionary (string key) value.
 *
 * ### Example
 * ```ts
 * random(dict())
 * // => {"&o(l%": ""}
 * ```
 *
 * @param keyValue - The arbitraries to use for key/value.
 * @returns A dictionary arbitrary.
 *
 * @group Arbitrary
 */
export function dict<T, K extends PropertyKey>(
    keyValue: Arbitrary<T> | [Arbitrary<K>, Arbitrary<T>],
    context: RelaxedPartial<DictGenerator> = {}
): Dependent<Record<string, T>> {
    const { minLength = 0, maxLength = 10 } = context
    const [key, value] = isArray(keyValue) ? keyValue : [string(), keyValue]
    const aset = set(tuple(key, value), { eq: (a, b) => a[0] === b[0], minLength, maxLength })

    return dependentArbitrary((ctx) => mapTree(aset.value(ctx), (kvs) => Object.fromEntries(kvs)))
}
