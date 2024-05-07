import { createHash } from 'node:crypto'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { string } from '../string/string.js'

/**
 * It returns an arbitrary that generates valid uuids
 *
 * ### Example
 * ```ts
 * random(uuid())
 * // => "01234567-89ab-cdef-0123-456789abcdef"
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function uuidv4Arbitrary(): Dependent<string> {
    return string({ size: 'xl' })
        .map((x) => {
            const hash = createHash('sha256').update(x).digest('hex')
            // Now take the first 16 bytes (32 hex characters) and apply UUID v4 formatting
            const time_low = hash.substring(0, 8)
            const time_mid = hash.substring(8, 12)
            const time_hi_and_version = (Number.parseInt(hash.substring(12, 16), 16) & 0x0fff) | 0x4000
            const clock_seq_hi_and_reserved = (Number.parseInt(hash.substring(16, 18), 16) & 0x3f) | 0x80
            const clock_seq_low = hash.substring(18, 20)
            const node = hash.substring(20, 32)

            return `${time_low}-${time_mid}-${time_hi_and_version.toString(16)}-${clock_seq_hi_and_reserved.toString(
                16,
            )}${clock_seq_low}-${node}`
        })
        .constant()
}
