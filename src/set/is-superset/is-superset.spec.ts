import { isSuperset } from './is-super'

test('simple', () => {
    expect(isSuperset([1, 2, 3], [2, 3, 4])).toBeFalse()
    expect(isSuperset([2, 3], [1, 2, 3])).toBeFalse()
    expect(isSuperset([1, 2, 3], [2, 3])).toBeTrue()
})
