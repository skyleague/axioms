import { intersection } from './intersection.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(intersection(new Set([1, 2, 3]), new Set([2, 3, 4]))).toMatchInlineSnapshot(`
        Set {
          2,
          3,
        }
    `)
})

it('iterator', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toMatchInlineSnapshot(`
        Set {
          2,
          3,
        }
    `)
})
