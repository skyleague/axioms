import { expect, it } from 'vitest'
import { isPromise } from './is-promise.js'

it('simple', () => {
    expect(isPromise(Promise.resolve(1))).toBe(true)
    expect(isPromise(1)).toBe(false)
})
