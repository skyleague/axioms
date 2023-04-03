import { mapTree } from '../../../algorithm/tree/index.js'
import type { Dependent } from '../../arbitrary/dependent/index.js'
import { dependentArbitrary } from '../../arbitrary/dependent/index.js'
import { array } from '../array/index.js'
import { lowerAlphaNumericChar } from '../char/index.js'
import { lowerAlphaNumeric } from '../string/index.js'
import { tuple } from '../tuple/index.js'

/**
 * It returns an arbitrary that generates valid domains according to https://www.ietf.org/rfc/rfc1034.txt
 *
 * ### Example
 * ```ts
 * random(domain())
 * // => "xt8x57fyxl3r.pq11p"
 * ```
 *
 * @returns A domain arbitrary.
 *
 * @group Arbitrary
 */
export function domain(): Dependent<string> {
    const atld = lowerAlphaNumeric({ minLength: 2, maxLength: 12 })
    const adomain = tuple(array(subdomain(), { minLength: 1, maxLength: 4 }), atld)
    return dependentArbitrary((context) =>
        mapTree(adomain.value(context), ([subdomains, tld]) => `${subdomains.join('.')}.${tld}`)
    )
}

/**
 * It returns an arbitrary that generates valid subdomains.
 *
 * ### Example
 * ```ts
 * random(domain())
 * // => "ntcc"
 * ```
 *
 * @returns A subdomain arbitrary.
 *
 * @group Arbitrary
 */
export function subdomain(): Dependent<string> {
    const label = tuple(lowerAlphaNumericChar(), lowerAlphaNumeric({ maxLength: 61, extra: '-' }), lowerAlphaNumericChar())
    return dependentArbitrary((context) => mapTree(label.value(context), (s) => s.join('')))
}
