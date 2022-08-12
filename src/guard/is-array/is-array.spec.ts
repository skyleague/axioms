import { isArray } from '.'

test('simple', () => {
    expect(isArray([])).toBeTrue()
})

test('simple', () => {
    const array = [2, 3]
    expect(isArray(array)).toBeTrue()
})

test('not array', () => {
    expect(isArray(2)).toBeFalse()
})

test('object with length', () => {
    const fakeArray: Record<number, string | undefined> & { length: number } = { length: 1 }
    fakeArray[0] = 'x'
    expect(isArray(fakeArray)).toBeFalse()
})

test('null', () => {
    expect(isArray(null)).toBeFalse()
})

test('undefined', () => {
    expect(isArray(undefined)).toBeFalse()
})
