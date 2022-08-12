import type { RelaxedPartial } from '../../../type/partial'
import type { Dependent } from '../../arbitrary/dependent'
import { float } from '../float'
import { integer } from '../integer'
import { oneOf } from '../one-of'
import { alphaNumericString } from '../string/string'
import { symbol } from '../symbol'

export interface PropertyKeyGenerator {
    integer: boolean
    float: boolean
    string: boolean
    symbol: boolean
}

export function propertyKey(context: RelaxedPartial<PropertyKeyGenerator> = {}): Dependent<PropertyKey> {
    const {
        integer: generateInteger = true,
        float: generateFloat = true,
        string: generateString = true,
        symbol: generateSymbol = true,
    } = context
    return oneOf(
        ...(generateInteger ? [integer()] : []),
        ...(generateFloat ? [float()] : []),
        ...(generateString ? [alphaNumericString()] : []),
        ...(generateSymbol ? [symbol()] : [])
    )
}
