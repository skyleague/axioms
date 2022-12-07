import type { RelaxedPartial } from '../../../type/partial'
import type { Dependent } from '../../arbitrary/dependent'
import { float } from '../float'
import { integer } from '../integer'
import { oneOf } from '../one-of'
import { alphaNumeric } from '../string/string'
import { symbol } from '../symbol'

/**
 * Describes how property key values are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface PropertyKeyGenerator {
    integer: boolean
    float: boolean
    string: boolean
    symbol: boolean
}

/**
 * It returns an arbitrary that generates an object property key.
 *
 * ### Example
 * ```ts
 * random(propertyKey())
 * // => ""
 *
 * random(propertyKey())
 * // => "MWxUWO93"
 * ```
 *
 * @returns An property key arbitrary.
 *
 * @group Arbitrary
 */
export function propertyKey(constraints: RelaxedPartial<PropertyKeyGenerator> = {}): Dependent<PropertyKey> {
    const {
        integer: generateInteger = true,
        float: generateFloat = true,
        string: generateString = true,
        symbol: generateSymbol = true,
    } = constraints
    return oneOf(
        ...(generateInteger ? [integer()] : []),
        ...(generateFloat ? [float()] : []),
        ...(generateString ? [alphaNumeric()] : []),
        ...(generateSymbol ? [symbol()] : [])
    )
}
