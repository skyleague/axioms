import { range } from './index.js'

import { collect } from '../../array/index.js'
import { forAll, tuple, integer } from '../../random/index.js'

import { expect, it } from 'vitest'

it('is [x,y[', () => {
    forAll(tuple(integer({ max: 100 }), integer({ min: 3, max: 100 })), ([x, y]: [number, number]) => {
        const to = x + y
        return collect(range(x, to)).includes(x) && !collect(range(x, to)).includes(to)
    })
})

it('floor y/2 + x is in [x,y[', () => {
    forAll(tuple(integer({ max: 100 }), integer({ min: 3, max: 100 })), ([x, y]) => {
        const to = x + y
        const half = Math.floor(y / 2) + x
        return collect(range(x, to)).includes(half)
    })
})

it('singular', () => {
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

it('for loop', () => {
    const xs: number[] = []
    for (const x of range(10)) {
        xs.push(x)
    }
    expect(xs).toMatchInlineSnapshot(`
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ]
    `)
})

it('negative', () => {
    expect(collect(range(-5))).toMatchInlineSnapshot(`[]`)
})

it('steps', () => {
    expect(collect(range(0, 20, 5))).toMatchInlineSnapshot(`
        [
          0,
          5,
          10,
          15,
        ]
    `)
})
