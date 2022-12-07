import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { element } from '../element'
import { integer } from '../integer'

import { toUSVString } from 'util'

/**
 * Describes how characters are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface CharGenerator {
    /**
     * The minimum character integer value to generate.
     */
    min: number
    /**
     * The maximum character integer value to generate.
     */
    max: number
    /**
     * A simple transformer function.
     * @param x - The value to transform.
     * @returns The transformed value.
     */
    transform: (x: number) => string
}

/**
 * @internal
 * @group Arbitrary
 */
export function charGenerator(context: Partial<CharGenerator> = {}): Dependent<string> {
    const { min = 32, max = 126, transform = String.fromCharCode } = context
    const int = integer({ min, max })
    return dependentArbitrary((ctx) => mapTree(int.value(ctx), (i) => transform(i)))
}

function toAscii(x: number): string {
    return String.fromCharCode(x > 94 ? x - 95 : x + 32)
}

/**
 * Generate a character arbitrary.
 *
 * ### Example
 * ```ts
 * random(char())
 * // => "-"
 * ```
 *
 * @param options - Describe how the character must be generated.
 * @returns An arbitrary character.
 *
 * @group Arbitrary
 */
export function char(options: Partial<CharGenerator> = {}): Dependent<string> {
    return charGenerator(options)
}

/**
 * Generate a hexidecimal (0-9a-f) character arbitrary.
 *
 * ### Example
 * ```ts
 * random(hexChar())
 * // => "d"
 * ```
 *
 * @returns An arbitrary hexadecimal character.
 *
 * @group Arbitrary
 */
export function hexChar(): Dependent<string> {
    return charGenerator({
        min: 0,
        max: 16,
        transform: (x) => x.toString(16),
    })
}

/**
 * Generate a valid base64 (a-zA-Z0-9+/) character arbitrary.
 *
 * ### Example
 * ```ts
 * random(base64Char())
 * // => "A"
 * ```
 *
 * @returns An arbitrary base64 character.
 *
 * @group Arbitrary
 */
export function base64Char(): Dependent<string> {
    // = is padding, so it's not allowed in this function
    return element('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/')
}

/**
 * Generate a valid alpha (a-zA-Z) character arbitrary.
 *
 * ### Example
 * ```ts
 * random(alphaChar())
 * // => "B"
 * ```
 *
 * @param extra - A string of extra characters to include in the set of characters to choose from.
 * @returns An arbitrary alpha character.
 *
 * @group Arbitrary
 */
export function alphaChar(extra = ''): Dependent<string> {
    return element(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ${extra}`)
}

/**
 * Generate a valid lower case alpha (a-z) character arbitrary.
 *
 * ### Example
 * ```ts
 * random(lowerAlphaChar())
 * // => "b"
 * ```
 *
 * @param extra - A string of extra characters to include in the set of characters to choose from.
 * @returns An arbitrary lower case alpha character.
 *
 * @group Arbitrary
 */
export function lowerAlphaChar(extra = ''): Dependent<string> {
    return element(`abcdefghijklmnopqrstuvwxy${extra}`)
}

/**
 * Generate a valid alpha numeric (a-zA-Z0-9) character arbitrary.
 *
 * ### Example
 * ```ts
 * random(alphaNumericChar())
 * // => "9"
 * ```
 *
 * @param extra - A string of extra characters to include in the set of characters to choose from.
 * @returns An arbitrary alpha numeric character.
 *
 * @group Arbitrary
 */
export function alphaNumericChar(extra = ''): Dependent<string> {
    return element(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${extra}`)
}

/**
 * Generate a valid lower case alpha numeric (a-z0-9) character arbitrary.
 *
 * ### Example
 * ```ts
 * random(lowerAlphaNumericChar())
 * // => "b"
 * ```
 *
 * @param extra - A string of extra characters to include in the set of characters to choose from.
 * @returns An arbitrary lower case alpha numeric character.
 *
 * @group Arbitrary
 */
export function lowerAlphaNumericChar(extra = ''): Dependent<string> {
    return element(`abcdefghijklmnopqrstuvwxyz0123456789${extra}`)
}

/**
 * Generate a character from the ascii alphabet arbitrary.
 *
 * ### Example
 * ```ts
 * random(asciiChar())
 * // => "c"
 * ```
 *
 * @returns An ascii character.
 *
 * @group Arbitrary
 */
export function asciiChar(): Dependent<string> {
    return charGenerator({ min: 0, max: 126, transform: toAscii })
}

/**
 * Generate an utf16 character arbitrary.
 *
 * ### Example
 * ```ts
 * random(utf16Char())
 * // => "c"
 * ```
 *
 * @returns An utf16 character.
 *
 * @group Arbitrary
 */
export function utf16Char(): Dependent<string> {
    return charGenerator({ min: 0x00, max: 0xffff, transform: String.fromCodePoint }).map(toUSVString)
}

/**
 * Generate an utf16 character (including surrogate) arbitrary.
 *
 * ### Example
 * ```ts
 * random(utf16SurrogateChar())
 * // => "c"
 * ```
 *
 * @returns An utf16 character.
 *
 * @group Arbitrary
 */
export function utf16SurrogateChar(): Dependent<string> {
    return charGenerator({ min: 0x00, max: 0x10ffff, transform: String.fromCodePoint }).map(toUSVString)
}
