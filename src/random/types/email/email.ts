import type { Dependent } from '../../arbitrary/dependent/index.js'
import { domain } from '../domain/domain.js'
import { lowerAlphaNumeric } from '../string/index.js'
import { tuple } from '../tuple/index.js'

/**
 * It returns an arbitrary that generates valid email addresses according to https://datatracker.ietf.org/doc/html/rfc5322
 *
 * ### Example
 * ```ts
 * random(email())
 * // => "xt8x57fyxl3r.pq11p"
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function email(): Dependent<string> {
    // @TODO include dot-atoms, quoted strings, escaped chars
    const local = lowerAlphaNumeric({ extra: "!#$%&'*+-/=^_`{|}~.", minLength: 1, maxLength: 64 })
    return tuple(local, domain())
        .map(([local, dom]) => `${local}@${dom}`)
        .filter((x) => x.length <= 254)
}
