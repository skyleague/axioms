import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/array.js'
import { integer } from '../integer/integer.js'

/**
 * It returns an arbitrary that generates valid cuids
 *
 * ### Example
 * ```ts
 * random(cuidArbitrary())
 * // => "
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function cuidArbitrary(): Dependent<string> {
    return array(integer({ min: 0, max: 15 }), { minLength: 8, maxLength: 8 })
        .map((nums) => nums.map((n) => n.toString(16)).join(''))
        .chain((timestamp) =>
            array(integer({ min: 0, max: 9 }), { minLength: 4, maxLength: 4 }).map((nums) => [timestamp, nums.join('')]),
        )
        .chain(([timestamp, counter]) =>
            array(integer({ min: 0, max: 15 }), { minLength: 4, maxLength: 4 })
                .map((nums) => nums.map((n) => n.toString(16)).join(''))
                .map((fingerprint) => [timestamp, counter, fingerprint]),
        )
        .chain(([timestamp, counter, fingerprint]) =>
            array(integer({ min: 0, max: 15 }), { minLength: 8, maxLength: 8 })
                .map((nums) => nums.map((n) => n.toString(16)).join(''))
                .map((random) => `c${timestamp}${counter}${fingerprint}${random}`),
        )
}
