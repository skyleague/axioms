import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/index.js'
import { lowerAlphaNumericChar } from '../char/index.js'
import { lowerAlphaNumeric } from '../string/index.js'
import { lowerAlpha } from '../string/string.js'
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
export function domain({ format = 'full' }: { format?: 'full' | 'restricted' } = {}): Dependent<string> {
    if (format === 'restricted') {
        return tuple(
            array(
                // Each subdomain part must start with alphanumeric and can contain hyphens
                tuple(
                    lowerAlphaNumeric({ minLength: 1, maxLength: 1 }), // First char must be alphanumeric
                    lowerAlphaNumeric({ minLength: 1, maxLength: 61, extra: '-', size: 's' }), // Rest can have hyphens
                    lowerAlphaNumericChar(), // Last char must be alphanumeric
                ).map(([first, middle, last]) => first + middle + last),
                { minLength: 1, maxLength: 4, size: 's' },
            ),
            lowerAlpha({ minLength: 2, maxLength: 12, size: 's' }), // TLD must be only letters
        ).map(([subdomains, tld]) => `${subdomains.join('.')}.${tld}`)
    }

    // Full format allows more flexibility per RFC specs
    return tuple(
        array(subdomain(), { minLength: 1, maxLength: 4, size: 's' }),
        lowerAlpha({ minLength: 2, maxLength: 12, size: 's' }),
    ).map(([subdomains, tld]) => `${subdomains.join('.')}.${tld}`)
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
    return tuple(
        lowerAlphaNumericChar(),
        lowerAlphaNumeric({ maxLength: 61, extra: '-', size: 's' }),
        lowerAlphaNumericChar(),
    ).map((xs) => xs.join(''))
}
