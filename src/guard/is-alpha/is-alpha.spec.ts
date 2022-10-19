import { isAlpha } from '.'

import { alphaString, forAll, integer } from '../..'

test('alpha', () => {
    forAll(alphaString({ minLength: 1 }), (x) => isAlpha(x))
})

test('numeric', () => {
    forAll(integer(), (x) => !isAlpha(x.toString()))
})

test('special characters', () => {
    expect(isAlpha('%')).toBeFalse()
})
