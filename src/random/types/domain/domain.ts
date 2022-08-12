import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { makeDependent } from '../../arbitrary/dependent'
import { array } from '../array'
import { lowerAlphaNumeric } from '../char'
import { lowerAlphaNumericString } from '../string'
import { tuple } from '../tuple'

// https://www.ietf.org/rfc/rfc1034.txt
export function domain(): Dependent<string> {
    const atld = lowerAlphaNumericString({ minLength: 2, maxLength: 12 })
    const adomain = tuple(array(subdomain(), { minLength: 1, maxLength: 4 }), atld)
    return makeDependent((context) => mapTree(adomain.value(context), ([subdomains, tld]) => `${subdomains.join('.')}.${tld}`))
}

export function subdomain(): Dependent<string> {
    const label = tuple(lowerAlphaNumeric(), lowerAlphaNumericString({ maxLength: 61, extra: '-' }), lowerAlphaNumeric())
    return makeDependent((context) => mapTree(label.value(context), (s) => s.join('')))
}
