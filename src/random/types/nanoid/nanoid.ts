import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/array.js'
import { integer } from '../integer/integer.js'

/**
 * It returns an arbitrary that generates valid nanoids
 *
 * ### Example
 * ```ts
 * random(nanoidArbitrary())
 * // => "
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function nanoidArbitrary(): Dependent<string> {
    const size = 21
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'
    return array(integer({ min: 0, max: alphabet.length - 1 }), { minLength: size, maxLength: size }).map((nums) =>
        nums.map((n) => alphabet[n]).join(''),
    )
}
