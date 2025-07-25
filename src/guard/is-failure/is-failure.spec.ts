import { expect, it } from 'vitest'
import { isFailure } from './is-failure.js'

it('simple', () => {
    expect(isFailure('foobar')).toBe(false)
    expect(isFailure(new Error())).toBe(true)
})
