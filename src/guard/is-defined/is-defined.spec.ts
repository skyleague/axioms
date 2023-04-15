import { isDefined } from './index.js'

import { forAll, unknown } from '../../index.js'

import { expect, it } from 'vitest'

it('isDefined', () => {
    expect(isDefined([])).toBe(true)
    expect(isDefined([1])).toBe(true)
    expect(isDefined(null)).toBe(false)
    expect(isDefined(undefined)).toBe(false)
})

it('isDefined', () => {
    forAll(unknown(), (x) => isDefined(x) === (x !== undefined && x !== null))
})
