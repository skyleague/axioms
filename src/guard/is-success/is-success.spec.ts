import { isSuccess } from './is-success.js'

import { forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(isSuccess('foobar')).toBe(true)
    expect(isSuccess(new Error())).toBe(false)
})

it('unknown is success', () => {
    forAll(unknown(), (x) => isSuccess(x))
})
