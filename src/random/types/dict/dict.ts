import { isArray } from '../../../guard/is-array/index.js'
import type { RelaxedPartial } from '../../../type/partial/index.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { object } from '../object/object.js'
import { set } from '../set/index.js'
import { string } from '../string/index.js'

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
    const { minLength = 0, maxLength = 5 } = context
    const [key, value] = isArray(keyValue) ? keyValue : [string(), keyValue]
    return set<string | K>(key, { minLength, maxLength }).chain((keys) => {
        return object(Object.fromEntries(keys.map((k) => [k, value] as const)))
    })
}
