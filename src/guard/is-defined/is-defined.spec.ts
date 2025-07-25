import { expect, it } from 'vitest'

import { forAll, unknown } from '../../index.js'
import { isDefined } from './index.js'

it('isDefined', () => {
    expect(isDefined([])).toBe(true)
    expect(isDefined([1])).toBe(true)
    expect(isDefined(null)).toBe(false)
    expect(isDefined(undefined)).toBe(false)
})

it('isDefined', () => {
    forAll(unknown(), (x) => isDefined(x) === (x !== undefined && x !== null))
})
