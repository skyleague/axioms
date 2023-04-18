import { isError } from './index.js'

import { forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('unknown is not error', () => {
    forAll(unknown(), (x) => !isError(x))
})

it('error is error', () => {
    expect(isError(new Error())).toBe(true)
})
