import type { Dependent } from '../../arbitrary/dependent/index.js'
import { array } from '../array/array.js'
import { constants } from '../constants/constants.js'
import { domain } from '../domain/domain.js'
import { optional } from '../helper/helper.js'
import { integer } from '../integer/integer.js'
import { lowerAlphaNumeric } from '../string/index.js'
import { tuple } from '../tuple/index.js'

/**
 * It returns an arbitrary that generates valid uris according to https://datatracker.ietf.org/doc/html/rfc3986
 *
 * ### Example
 * ```ts
 * random(uri())
 * // => "https://example.com:8080/abc/def"
 * ```
 *
 * @returns An email arbitrary.
 *
 * @group Arbitrary
 */
export function uri(): Dependent<string> {
    return tuple(
        constants('http', 'https'),
        domain(),
        optional(
            integer({ min: 0, max: 2 ** 16 - 1 }).map((port) => `:${port}`),
            { symbol: '' },
        ),
        array(
            lowerAlphaNumeric({ size: 's' }).map((x) => encodeURIComponent(x)),
            { size: '-2' },
        ).map((xs) => `/${xs.join('/')}`),
    ).map(([scheme, domain, port, path]) => `${scheme}://${domain}${port}${path}`)
}
