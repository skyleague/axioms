import { mapTree } from '../../../algorithm/tree'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { element } from '../element'
import { integer } from '../integer'

export interface CharGenerator {
    min: number
    max: number
    transform: (x: number) => string
}

export function charGenerator(context: Partial<CharGenerator> = {}): Arbitrary<string> {
    const { min = 32, max = 126, transform = String.fromCharCode } = context
    const int = integer({ min, max })
    return dependentArbitrary((ctx) => mapTree(int.value(ctx), (i) => transform(i)))
}

function toAscii(x: number): string {
    return String.fromCharCode(x > 94 ? x - 95 : x + 32)
}

export function char(context: Partial<CharGenerator> = {}): Arbitrary<string> {
    return charGenerator(context)
}

export function hexChar(): Arbitrary<string> {
    return charGenerator({
        min: 0,
        max: 16,
        transform: (x) => x.toString(16),
    })
}

export function base64Char(): Arbitrary<string> {
    // = is padding, so it's not allowed in this function
    return element('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/')
}

export function alphaChar(extra = ''): Arbitrary<string> {
    return element(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ${extra}`)
}

export function lowerAlphaChar(extra = ''): Arbitrary<string> {
    return element(`abcdefghijklmnopqrstuvwxy${extra}`)
}

export function alphaNumericChar(extra = ''): Arbitrary<string> {
    return element(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${extra}`)
}

export function lowerAlphaNumericChar(extra = ''): Arbitrary<string> {
    return element(`abcdefghijklmnopqrstuvwxyz0123456789${extra}`)
}
export function asciiChar(): Arbitrary<string> {
    return charGenerator({ min: 0, max: 126, transform: toAscii })
}

export function utf16Char(): Arbitrary<string> {
    return charGenerator({ min: 0x00, max: 0xffff, transform: String.fromCodePoint })
}

export function utf16surrogateChar(): Arbitrary<string> {
    return charGenerator({ min: 0x00, max: 0x10ffff, transform: String.fromCodePoint })
}
