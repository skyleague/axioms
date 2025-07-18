import { expect, it } from 'vitest'

import { alpha, forAll, integer } from '../../index.js'
import { isAlpha } from './index.js'

it('alpha', () => {
    forAll(alpha({ minLength: 1 }), (x) => isAlpha(x))
})

it('numeric', () => {
    forAll(integer(), (x) => !isAlpha(x.toString()))
})

it('special characters', () => {
    expect(isAlpha('%')).toBe(false)
})
