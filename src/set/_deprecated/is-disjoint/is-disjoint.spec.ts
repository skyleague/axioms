import { isDisjoint } from './is-disjoint.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(isDisjoint([1, 2, 3], [2, 3, 4])).toBe(false)
    expect(isDisjoint([1, 2, 3], [4, 5, 6])).toBe(true)
})
