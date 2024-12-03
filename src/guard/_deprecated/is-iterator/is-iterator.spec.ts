import { isIterator } from './index.js'

import { forAll, unknown } from '../../../random/index.js'

import { expect, it } from 'vitest'

it('unknown is not iterator', () => {
    forAll(unknown(), (xs) => !isIterator(xs))
})

it('next function is iterator', () => {
    expect(isIterator({ next: () => false })).toBe(true)
})
