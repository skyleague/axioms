import { isLeft } from './index.js'

import { forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('unknown is not left', () => {
    forAll(unknown(), (x) => !isLeft(x))
})

it('left property is left', () => {
    expect(isLeft({ left: 'foo' })).toBe(true)
})
