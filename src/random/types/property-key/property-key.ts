import type { MaybePartial } from '../../../type/partial/partial.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { float } from '../float/index.js'
import { integer } from '../integer/index.js'
import { oneOf } from '../one-of/index.js'
import { alphaNumeric } from '../string/string.js'
import { symbol } from '../symbol/index.js'

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
export function propertyKey(constraints: MaybePartial<PropertyKeyGenerator> = {}): Dependent<PropertyKey> {
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
        ...(generateSymbol ? [symbol()] : []),
    )
}
