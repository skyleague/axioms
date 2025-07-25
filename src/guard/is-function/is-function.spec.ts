import { expect, it } from 'vitest'

import { forAll, unknown } from '../../random/index.js'
import { isFunction } from './index.js'

it('unknown is not a function', () => {
    forAll(unknown(), (x) => !isFunction(x))
})

it('lambda is function', () => {
    expect(isFunction(() => false)).toBe(true)
})
