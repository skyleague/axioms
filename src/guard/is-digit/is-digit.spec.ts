import { isDigits } from './index.js'

test('alpha', () => {
    expect(isDigits('0')).toBeTrue()
})

test('special characters', () => {
    expect(isDigits('%')).toBeFalse()
})
