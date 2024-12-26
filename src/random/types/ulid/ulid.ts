import type { Dependent } from '../../arbitrary/dependent/index.js'
import { integer } from '../integer/integer.js'
import { tuple } from '../tuple/index.js'

function convertToPaddedBase32(num: number, paddingLength: number) {
    const characters = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
    const toBase32 = (num: number) => {
        let base32Str = ''
        let x = num
        while (x > 0) {
            base32Str = characters[x % 32] + base32Str
            x >>= 5
        }
        return base32Str
    }

    const head = Math.floor(num / 0x40000000)
    const tail = num & 0x3fffffff
    return `${toBase32(head).padStart(paddingLength - 6, '0')}${toBase32(tail).padStart(6, '0')}`
}

/**
 * It returns an arbitrary that generates valid ulids
 *
 * ### Example
 * ```ts
 * random(ulid())
 * // => "
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function ulidArbitrary(): Dependent<string> {
    return tuple(
        integer({ min: 0, max: 0xffffffffffff }),
        integer({ min: 0, max: 0xffffffffff }),
        integer({ min: 0, max: 0xffffffffff }),
    ).map(([x0, x1, x2]) => `${convertToPaddedBase32(x0, 10)}${convertToPaddedBase32(x1, 8)}${convertToPaddedBase32(x2, 8)}`)
}
