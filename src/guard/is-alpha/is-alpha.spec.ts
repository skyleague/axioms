import { isAlpha } from './index.js'

import { alpha, forAll, integer } from '../../index.js'

import { expect, it } from 'vitest'

it('alpha', () => {
    forAll(alpha({ minLength: 1 }), (x) => isAlpha(x))
})

it('numeric', () => {
    forAll(integer(), (x) => !isAlpha(x.toString()))
})

it('special characters', () => {
    expect(isAlpha('%')).toBe(false)
})
