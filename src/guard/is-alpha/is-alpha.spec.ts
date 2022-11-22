import { isAlpha } from '.'

import { alpha, forAll, integer } from '../..'

test('alpha', () => {
    forAll(alpha({ minLength: 1 }), (x) => isAlpha(x))
})

test('numeric', () => {
    forAll(integer(), (x) => !isAlpha(x.toString()))
})

test('special characters', () => {
    expect(isAlpha('%')).toBeFalse()
})
