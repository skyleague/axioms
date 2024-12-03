import { difference, symmetricDifference } from './difference.js'

import { describe, expect, it } from 'vitest'

describe('difference', () => {
    it('simple', () => {
        expect(difference(new Set([1, 2, 3]), new Set([2, 3, 4]))).toMatchInlineSnapshot(`
                    Set {
                      1,
                    }
            `)
    })

    it('iterator', () => {
        expect(difference([1, 2, 3], [2, 3, 4])).toMatchInlineSnapshot(`
                    Set {
                      1,
                    }
            `)
    })
})

describe('symmetricDifference', () => {
    it('simple', () => {
        expect(symmetricDifference(new Set([1, 2, 3]), new Set([2, 3, 4]))).toMatchInlineSnapshot(`
            Set {
              1,
              4,
            }
        `)
    })

    it('iterator', () => {
        expect(symmetricDifference([1, 2, 3], [2, 3, 4])).toMatchInlineSnapshot(`
            Set {
              1,
              4,
            }
        `)
    })
})
