import { isUndefined } from './index.js'

import { forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('undefined', () => {
    expect(isUndefined(undefined)).toEqual(true)
})

it('null', () => {
    expect(isUndefined(null!)).toEqual(false)
})

it('void', () => {
    expect(isUndefined(void 0)).toEqual(true)
})

it('primitive is not undefined', () => {
    forAll(unknown({ undefined: false }), (x) => !isUndefined(x))
})
