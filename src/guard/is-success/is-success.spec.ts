import { expect, it } from 'vitest'

import { forAll, unknown } from '../../random/index.js'
import { isSuccess } from './is-success.js'

it('simple', () => {
    expect(isSuccess('foobar')).toBe(true)
    expect(isSuccess(new Error())).toBe(false)
})

it('unknown is success', () => {
    forAll(unknown(), (x) => isSuccess(x))
})
