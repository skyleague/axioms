import { isAlpha } from '.'

import { alphaString, forAll } from '../..'

test('alpha', () => {
    forAll(alphaString({ minLength: 1 }), (x) => isAlpha(x))
})

test('special characters', () => {
    expect(isAlpha('%')).toBeFalse()
})
