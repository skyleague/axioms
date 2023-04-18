import { isDigits } from './index.js'

import { expect, it } from 'vitest'

it('alpha', () => {
    expect(isDigits('0')).toBe(true)
})

it('special characters', () => {
    expect(isDigits('%')).toBe(false)
})
