import { isFailure } from './is-failure.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(isFailure('foobar')).toBe(false)
    expect(isFailure(new Error())).toBe(true)
})
