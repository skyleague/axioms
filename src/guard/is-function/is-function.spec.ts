import { isFunction } from './index.js'

import { forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('unknown is not a function', () => {
    forAll(unknown(), (x) => !isFunction(x))
})

it('lambda is function', () => {
    expect(isFunction(() => false)).toBe(true)
})
