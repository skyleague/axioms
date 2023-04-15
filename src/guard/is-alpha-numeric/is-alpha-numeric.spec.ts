import { isAlphaNumeric } from './index.js'

import { alphaNumeric, forAll } from '../../index.js'

import { expect, it } from 'vitest'

it('alpha', () => {
    forAll(alphaNumeric({ minLength: 1 }), (x) => isAlphaNumeric(x))
})

it('special characters', () => {
    expect(isAlphaNumeric('%')).toBe(false)
})
