import { isSubset } from './is-subset.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(isSubset([1, 2, 3], [2, 3, 4])).toBe(false)
    expect(isSubset([2, 3], [1, 2, 3])).toBe(true)
})
