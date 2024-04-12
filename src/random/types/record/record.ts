import { isArray } from '../../../guard/is-array/index.js'
import type { MaybePartial } from '../../../type/partial/partial.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { ArbitrarySize } from '../../arbitrary/arbitrary/size.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { object } from '../object/object.js'
import { set } from '../set/index.js'
import { string } from '../string/index.js'

export interface RecordGenerator {
    minLength: number
    maxLength: number
    size: ArbitrarySize
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
export function record<T, K extends PropertyKey>(
    keyValue: Arbitrary<T> | [Arbitrary<K>, Arbitrary<T>],
    context: MaybePartial<RecordGenerator> = {},
): Dependent<Record<string, T>> {
    const { minLength = 0, maxLength, size } = context
    const [key, value] = isArray(keyValue) ? keyValue : [string({ size }), keyValue]
    return set<string | K>(key, { minLength, maxLength, size }).chain((keys) => {
        return object(Object.fromEntries(keys.map((k) => [k, value] as const)))
    })
}

/**
 * @deprecated Use `record` instead.
 */
export const dict = record
