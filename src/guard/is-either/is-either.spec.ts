import { isEither } from './index.js'

import { forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('unknown is not either', () => {
    forAll(unknown(), (x) => !isEither(x))
})

it('left property is either', () => {
    expect(isEither({ left: 'foo' })).toBe(true)
})

it('right property is either', () => {
    expect(isEither({ right: 'foo' })).toBe(true)
})
