import { isAlphaNumeric } from '.'

import { alphaNumericString, forAll } from '../..'

test('alpha', () => {
    forAll(alphaNumericString({ minLength: 1 }), (x) => isAlphaNumeric(x))
})

test('special characters', () => {
    expect(isAlphaNumeric('%')).toBeFalse()
})
