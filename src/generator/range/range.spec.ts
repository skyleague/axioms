import { range } from './index.js'

import { collect } from '../../array/index.js'
import { forAll, tuple, integer } from '../../random/index.js'

test('is [x,y[', () => {
    forAll(
        tuple(integer({ max: 100 }), integer({ min: 3, max: 100 })),
        ([x, y]: [number, number]) => {
            const to = x + y
            return collect(range(x, to)).includes(x) && !collect(range(x, to)).includes(to)
        },
        { counterExample: [0, 3] }
    )
})

test('floor y/2 + x is in [x,y[', () => {
    forAll(tuple(integer({ max: 100 }), integer({ min: 3, max: 100 })), ([x, y]) => {
        const to = x + y
        const half = Math.floor(y / 2) + x
        return collect(range(x, to)).includes(half)
    })
})

test('singular', () => {
    expect(collect(range(5))).toMatchInlineSnapshot(`
        [
          0,
          1,
          2,
          3,
          4,
        ]
    `)
})

test('negative', () => {
    expect(collect(range(-5))).toMatchInlineSnapshot(`[]`)
})

test('steps', () => {
    expect(collect(range(0, 20, 5))).toMatchInlineSnapshot(`
        [
          0,
          5,
          10,
          15,
        ]
    `)
})
