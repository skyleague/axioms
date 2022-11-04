import { isSubset } from './is-subset'

test('simple', () => {
    expect(isSubset([1, 2, 3], [2, 3, 4])).toBeFalse()
    expect(isSubset([2, 3], [1, 2, 3])).toBeTrue()
})
