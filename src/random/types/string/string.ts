import { mapTree } from '../../../algorithm/tree'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import { makeDependent } from '../../arbitrary/dependent'
import { array } from '../array'
import { alpha, alphaNumeric, ascii, base64, char, hex, lowerAlpha, lowerAlphaNumeric, utf16, utf16surrogate } from '../char'

export interface StringGenerator {
    minLength: number
    maxLength: number
    transform: (x: string[]) => string
}

export function stringGenerator(a: Arbitrary<string>, context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    const { minLength = 0, maxLength = 10, transform = (s) => s.join('') } = context
    const alist = array(a, { minLength, maxLength })
    return makeDependent((ctx) => mapTree(alist.value(ctx), transform))
}
export function string(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(char(), context)
}

export function hexstring(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(hex(), context)
}

export function base64string(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(base64(), {
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

export function alphaString(context: RelaxedPartial<AlphaGenerator> = {}): Arbitrary<string> {
    const { extra = '' } = context
    return stringGenerator(alpha(extra), context)
}

export function lowerAlphaString(context: RelaxedPartial<AlphaGenerator> = {}): Arbitrary<string> {
    const { extra = '' } = context
    return stringGenerator(lowerAlpha(extra), context)
}

export interface AlphaNumericGenerator extends StringGenerator {
    extra: string
}

export function alphaNumericString(context: RelaxedPartial<AlphaNumericGenerator> = {}): Arbitrary<string> {
    const { extra = '' } = context
    return stringGenerator(alphaNumeric(extra), context)
}

export function lowerAlphaNumericString(context: RelaxedPartial<AlphaNumericGenerator> = {}): Arbitrary<string> {
    const { extra = '' } = context
    return stringGenerator(lowerAlphaNumeric(extra), context)
}

export function asciistring(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(ascii(), context)
}

export function utf16string(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(utf16(), context)
}

export function utf16surrogatestring(context: RelaxedPartial<StringGenerator> = {}): Arbitrary<string> {
    return stringGenerator(utf16surrogate(), context)
}
