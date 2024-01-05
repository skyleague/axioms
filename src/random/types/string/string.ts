import type { RelaxedPartial } from '../../../type/partial/index.js'
import type { Arbitrary } from '../../arbitrary/arbitrary/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/index.js'
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
    utf16SurrogateChar,
} from '../char/index.js'

/**
 * Describes how strings are allowed to be generated.
 *
 * @group Arbitrary
 */
export interface StringGenerator {
    /**
     * The minimum length of string to generate.
     */
    minLength: number
    /**
     * The maximum length of string to generate.
     */
    maxLength: number
    /**
     * A simple transformer function.
     * @param x - The value to transform.
     * @returns The transformed value.
     */
    transform: (x: string[]) => string
}

/**
 * @internal
 * @group Arbitrary
 */
export function stringGenerator(a: Arbitrary<string>, context: RelaxedPartial<StringGenerator> = {}): Dependent<string> {
    const { minLength = 0, maxLength = 10, transform = (s) => s.join('') } = context
    return array(a, { minLength, maxLength }).map(transform)
}

/**
 * Generate a string arbitrary.
 *
 * ### Example
 * ```ts
 * random(string())
 * // => "-abc"
 * ```
 *
 * @param options - Describe how the string must be generated.
 * @returns An arbitrary string.
 *
 * @group Arbitrary
 */

export function string(context: RelaxedPartial<StringGenerator> = {}): Dependent<string> {
    return stringGenerator(char(), context)
}

/**
 * Generate a hexidecimal (0-9a-f) string arbitrary.
 *
 * ### Example
 * ```ts
 * random(hex())
 * // => "deadbeef"
 * ```
 *
 * @returns An arbitrary hexadecimal string.
 *
 * @group Arbitrary
 */
export function hex(context: RelaxedPartial<StringGenerator> = {}): Dependent<string> {
    return stringGenerator(hexChar(), context)
}

/**
 * Generate a valid base64 (a-zA-Z0-9+/) string arbitrary. And adds the padding
 * as required.
 *
 * ### Example
 * ```ts
 * random(base64())
 * // => "abc="
 * ```
 *
 * @returns An arbitrary base64 string.
 *
 * @group Arbitrary
 */
export function base64(context: RelaxedPartial<StringGenerator> = {}): Dependent<string> {
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

/**
 * Generate a valid alpha (a-zA-Z) string arbitrary.
 *
 * ### Example
 * ```ts
 * random(alpha())
 * // => "Bab"
 * ```
 *
 * @param extra - A string of extra characters to include in the set of characters to choose from.
 * @returns An arbitrary alpha string.
 *
 * @group Arbitrary
 */
export function alpha(context: RelaxedPartial<AlphaGenerator> = {}): Dependent<string> {
    const { extra = '' } = context
    return stringGenerator(alphaChar(extra), context)
}

/**
 * Generate a valid lower case alpha (a-z) string arbitrary.
 *
 * ### Example
 * ```ts
 * random(lowerAlpha())
 * // => "bab"
 * ```
 *
 * @param extra - A string of extra characters to include in the set of characters to choose from.
 * @returns An arbitrary lower case alpha string.
 *
 * @group Arbitrary
 */
export function lowerAlpha(context: RelaxedPartial<AlphaGenerator> = {}): Dependent<string> {
    const { extra = '' } = context
    return stringGenerator(lowerAlphaChar(extra), context)
}

export interface AlphaNumericGenerator extends StringGenerator {
    extra: string
}

/**
 * Generate a valid alpha numeric (a-zA-Z0-9) string arbitrary.
 *
 * ### Example
 * ```ts
 * random(alphaNumeric())
 * // => "9ab10"
 * ```
 *
 * @param extra - A string of extra characters to include in the set of characters to choose from.
 * @returns An arbitrary alpha numeric string.
 *
 * @group Arbitrary
 */
export function alphaNumeric(context: RelaxedPartial<AlphaNumericGenerator> = {}): Dependent<string> {
    const { extra = '' } = context
    return stringGenerator(alphaNumericChar(extra), context)
}

/**
 * Generate a valid lower case alpha numeric (a-z0-9) string arbitrary.
 *
 * ### Example
 * ```ts
 * random(lowerAlphaNumericChar())
 * // => "b"
 * ```
 *
 * @param extra - A string of extra characters to include in the set of characters to choose from.
 * @returns An arbitrary lower case alpha numeric string.
 *
 * @group Arbitrary
 */
export function lowerAlphaNumeric(context: RelaxedPartial<AlphaNumericGenerator> = {}): Dependent<string> {
    const { extra = '' } = context
    return stringGenerator(lowerAlphaNumericChar(extra), context)
}

/**
 * Generate a string from the ascii alphabet arbitrary.
 *
 * ### Example
 * ```ts
 * random(ascii())
 * // => "cab"
 * ```
 *
 * @returns An ascii string.
 *
 * @group Arbitrary
 */
export function ascii(context: RelaxedPartial<StringGenerator> = {}): Dependent<string> {
    return stringGenerator(asciiChar(), context)
}

/**
 * Generate an utf16 string arbitrary.
 *
 * ### Example
 * ```ts
 * random(utf16())
 * // => "cab"
 * ```
 *
 * @returns An utf16 string.
 *
 * @group Arbitrary
 */
export function utf16(context: RelaxedPartial<StringGenerator> = {}): Dependent<string> {
    return stringGenerator(utf16Char(), context)
}

/**
 * Generate an utf16 string (including surrogate) arbitrary.
 *
 * ### Example
 * ```ts
 * random(utf16Surrogate())
 * // => "c"
 * ```
 *
 * @returns An utf16 string.
 *
 * @group Arbitrary
 */
export function utf16Surrogate(context: RelaxedPartial<StringGenerator> = {}): Dependent<string> {
    return stringGenerator(utf16SurrogateChar(), context)
}
