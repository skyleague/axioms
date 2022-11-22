import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { dependentArbitrary } from '../../arbitrary/dependent'
import { array } from '../array'
import { lowerAlphaNumericChar } from '../char'
import { lowerAlphaNumeric } from '../string'
import { tuple } from '../tuple'

// https://www.ietf.org/rfc/rfc1034.txt
export function domain(): Dependent<string> {
    const atld = lowerAlphaNumeric({ minLength: 2, maxLength: 12 })
    const adomain = tuple(array(subdomain(), { minLength: 1, maxLength: 4 }), atld)
    return dependentArbitrary((context) =>
        mapTree(adomain.value(context), ([subdomains, tld]) => `${subdomains.join('.')}.${tld}`)
    )
}

export function subdomain(): Dependent<string> {
    const label = tuple(lowerAlphaNumericChar(), lowerAlphaNumeric({ maxLength: 61, extra: '-' }), lowerAlphaNumericChar())
    return dependentArbitrary((context) => mapTree(label.value(context), (s) => s.join('')))
}
