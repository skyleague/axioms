import { expect, it } from 'vitest'
import { isDigits } from './index.js'

it('alpha', () => {
    expect(isDigits('0')).toBe(true)
})

it('special characters', () => {
    expect(isDigits('%')).toBe(false)
})
