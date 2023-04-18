import { isPromise } from './is-promise.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(isPromise(Promise.resolve(1))).toBe(true)
    expect(isPromise(1)).toBe(false)
})
