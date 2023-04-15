import { isArray } from './index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(isArray([])).toBe(true)
})

it('simple', () => {
    const array = [2, 3]
    expect(isArray(array)).toBe(true)
})

it('not array', () => {
    expect(isArray(2)).toBe(false)
})

it('object with length', () => {
    const fakeArray: Record<number, string | undefined> & { length: number } = { length: 1 }
    fakeArray[0] = 'x'
    expect(isArray(fakeArray)).toBe(false)
})

it('null', () => {
    expect(isArray(null)).toBe(false)
})

it('undefined', () => {
    expect(isArray(undefined)).toBe(false)
})
