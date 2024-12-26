import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/array.js'
import { integer } from '../integer/integer.js'

/**
 * It returns an arbitrary that generates valid cuid2s
 *
 * ### Example
 * ```ts
 * random(cuid2Arbitrary())
 * // => "
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function cuid2Arbitrary(): Dependent<string> {
    return array(integer({ min: 0, max: 35 }), { minLength: 24, maxLength: 24 }).map((nums) => {
        // Convert numbers 0-35 to base36 chars (0-9, a-z)
        // cuid2 is just 24 random base36 chars, no prefix needed
        return nums.map((n) => n.toString(36)).join('')
    })
}
