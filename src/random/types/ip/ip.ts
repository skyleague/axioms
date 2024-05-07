import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/array.js'
import { natural } from '../natural/natural.js'
import { string } from '../string/string.js'
import { tuple } from '../tuple/index.js'

/**
 * It returns an arbitrary that generates valid ipv4s
 *
 * ### Example
 * ```ts
 * random(ipv4())
 * // => "192.168.1.1"
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function ipv4(): Dependent<string> {
    return tuple(natural({ max: 255 }), natural({ max: 255 }), natural({ max: 255 }), natural({ max: 255 })).map((xs) =>
        xs.join('.'),
    )
}

/**
 * It returns an arbitrary that generates valid ipv6s
 *
 * ### Example
 * ```ts
 * random(ipv6())
 * // => "192.168.1.1"
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function ipv6(): Dependent<string> {
    return array(string({ format: 'hex', minLength: 4, maxLength: 4 }), { minLength: 8, maxLength: 8 }).map((xs) => xs.join(':'))
}
