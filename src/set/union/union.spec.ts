import { union } from './union.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(union(new Set([1, 2, 3]), new Set([2, 3, 4]))).toMatchInlineSnapshot(`
        Set {
          1,
          2,
          3,
          4,
        }
    `)
})

it('iterator', () => {
    expect(union([1, 2, 3], [2, 3, 4])).toMatchInlineSnapshot(`
        Set {
          1,
          2,
          3,
          4,
        }
    `)
})

it('mixed', () => {
    expect(union(new Set([1, 2, 3]), new Set(['2', '3', '4']))).toMatchInlineSnapshot(`
        Set {
          1,
          2,
          3,
          "2",
          "3",
          "4",
        }
    `)
})
