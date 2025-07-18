import { expect, it } from 'vitest'

import { forAll, unknown } from '../../random/index.js'
import { isError } from './index.js'

it('unknown is not error', () => {
    forAll(unknown(), (x) => !isError(x))
})

it('error is error', () => {
    expect(isError(new Error())).toBe(true)
})
