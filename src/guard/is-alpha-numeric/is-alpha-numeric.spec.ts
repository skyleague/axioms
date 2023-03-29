import { isAlphaNumeric } from './index.js'

import { alphaNumeric, forAll } from '../../index.js'

test('alpha', () => {
    forAll(alphaNumeric({ minLength: 1 }), (x) => isAlphaNumeric(x))
})

test('special characters', () => {
    expect(isAlphaNumeric('%')).toBeFalse()
})
