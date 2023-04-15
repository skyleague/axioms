import { isSuperset } from './is-super.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(isSuperset([1, 2, 3], [2, 3, 4])).toBe(false)
    expect(isSuperset([2, 3], [1, 2, 3])).toBe(false)
    expect(isSuperset([1, 2, 3], [2, 3])).toBe(true)
})
