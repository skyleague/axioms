import { isDigits } from '.'

test('alpha', () => {
    expect(isDigits('0')).toBeTrue()
})

test('special characters', () => {
    expect(isDigits('%')).toBeFalse()
})
