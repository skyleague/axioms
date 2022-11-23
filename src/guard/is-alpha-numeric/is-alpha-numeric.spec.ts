import { isAlphaNumeric } from '.'

import { alphaNumeric, forAll } from '../..'

test('alpha', () => {
    forAll(alphaNumeric({ minLength: 1 }), (x) => isAlphaNumeric(x))
})

test('special characters', () => {
    expect(isAlphaNumeric('%')).toBeFalse()
})
