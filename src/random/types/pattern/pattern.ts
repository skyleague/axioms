import type { Arbitrary } from '../../arbitrary/arbitrary/arbitrary.js'
import type { Dependent } from '../../arbitrary/index.js'
import { alphaChar, alphaNumericChar, lowerAlphaChar } from '../char/char.js'
import { integer } from '../integer/integer.js'
import { tuple } from '../tuple/index.js'

type PatternChar = '*' | '#' | 'A' | 'a' | 'i'

type PatternString<T extends string, A> = T extends PatternChar
    ? A
    : T extends `${PatternChar}${infer Rest}`
      ? PatternString<Rest, A>
      : { _error: 'String must exist of pattern chars only' }

/**
 * Generates a string based on a pattern string.
 *
 * ### Example
 * ```ts
 * random(pattern('A#*a'))
 * // => e.g. 'B5xq'
 * ```
 *
 * The pattern string can contain the following characters:
 * - `*`: any alphanumeric character
 * - `#`: any digit (0-9)
 * - `A`: any uppercase or lowercase alphabetical character
 * - `a`: any lowercase alphabetical character
 * - `i`: any alphabetical character (uppercase or lowercase)
 *
 * @param patternStr The pattern string to generate the string from.
 * @returns A `Dependent<string>` that generates a string based on the pattern string.
 *
 * @group Arbitrary
 */
export function pattern<S extends string>(patternStr: PatternString<S, S>): Dependent<string> {
    const arbitraries: Arbitrary<string | number>[] = []
    for (const p of patternStr as unknown as PatternChar[]) {
        if (p === 'a') {
            arbitraries.push(lowerAlphaChar())
        } else if (p === 'A') {
            arbitraries.push(lowerAlphaChar().map((x) => x.toUpperCase()))
        } else if (p === 'i') {
            arbitraries.push(alphaChar())
        } else if (p === '#') {
            arbitraries.push(integer({ min: 0, max: 9 }))
        } else {
            arbitraries.push(alphaNumericChar())
        }
    }
    return tuple(...arbitraries).map((xs) => xs.join(''))
}
