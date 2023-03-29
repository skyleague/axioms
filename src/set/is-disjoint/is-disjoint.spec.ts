import { isDisjoint } from './is-disjoint.js'

test('simple', () => {
    expect(isDisjoint([1, 2, 3], [2, 3, 4])).toBeFalse()
    expect(isDisjoint([1, 2, 3], [4, 5, 6])).toBeTrue()
})
