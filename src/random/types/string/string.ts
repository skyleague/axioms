import { mapTree } from '../../../algorithm/tree'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { array } from '../array'
import {
    alphaChar,
    alphaNumericChar,
    asciiChar,
    base64Char,
    char,
    hexChar,
    lowerAlphaChar,
    lowerAlphaNumericChar,
    utf16Char,
    utf16surrogateChar,
} from '../char'

export interface StringGenerator {
    minLength: number
    maxLength: number
    transform: (x: string[]) => string
}

export function stringGenerator(a: Arbitrary<string>, context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    const { minLength = 0, maxLength = 10, transform = (s) => s.join('') } = context
    const alist = array(a, { minLength, maxLength })
    return dependentArbitrary((ctx) => mapTree(alist.value(ctx), transform))
}
export function string(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(char(), context)
}

export function hex(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(hexChar(), context)
}

export function base64(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(base64Char(), {
        ...context,
        transform: (xs) => {
            const s = xs.join('')
            switch (xs.length % 4) {
                case 1:
                    return s.slice(1)
                case 2:
                    return `${s}==`
                case 3:
                    return `${s}=`
            }
            return s
        },
    })
}

export interface AlphaGenerator extends StringGenerator {
    extra: string
}

export function alpha(context: RelaxedPartial<AlphaGenerator> = {}): Arbitrary<string> {
    const { extra = '' } = context
    return stringGenerator(alphaChar(extra), context)
}

export function lowerAlpha(context: RelaxedPartial<AlphaGenerator> = {}): Arbitrary<string> {
    const { extra = '' } = context
    return stringGenerator(lowerAlphaChar(extra), context)
}

export interface AlphaNumericGenerator extends StringGenerator {
    extra: string
}

export function alphaNumeric(context: RelaxedPartial<AlphaNumericGenerator> = {}): Arbitrary<string> {
    const { extra = '' } = context
    return stringGenerator(alphaNumericChar(extra), context)
}

export function lowerAlphaNumeric(context: RelaxedPartial<AlphaNumericGenerator> = {}): Arbitrary<string> {
    const { extra = '' } = context
    return stringGenerator(lowerAlphaNumericChar(extra), context)
}

export function ascii(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(asciiChar(), context)
}

export function utf16(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(utf16Char(), context)
}

export function utf16surrogate(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(utf16surrogateChar(), context)
}
