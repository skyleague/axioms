import { expect, it } from 'vitest'

import { alphaNumeric, forAll } from '../../index.js'
import { isAlphaNumeric } from './index.js'

it('alpha', () => {
    forAll(alphaNumeric({ minLength: 1 }), (x) => isAlphaNumeric(x))
})

it('special characters', () => {
    expect(isAlphaNumeric('%')).toBe(false)
})
