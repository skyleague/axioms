import { expect, it } from 'vitest'

import { forAll, unknown } from '../../random/index.js'
import { isRight } from './index.js'

it('unknown is not right', () => {
    forAll(unknown(), (x) => !isRight(x))
})

it('right property is right', () => {
    expect(isRight({ right: 'foo' })).toBe(true)
})
