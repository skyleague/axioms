import { array, forAll, unknown } from '../../random/index.js'
import { queue } from './index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(queue([1, 2, 3, 4]).toArray()).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
})

it('continued', () => {
    const q = queue([1, 2, 3, 4])
    q.enqueue([5, 6, 7])
    const taken1 = q.take(3)
    expect([taken1.next().value, taken1.next().value, taken1.next().value]).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
        ]
    `)

    const taken2 = q.take(2)
    expect([taken2.next().value, taken2.next().value]).toMatchInlineSnapshot(`
        [
          4,
          5,
        ]
    `)

    const remaining1 = q
    expect([remaining1.next().value, remaining1.next().value]).toMatchInlineSnapshot(`
        [
          6,
          7,
        ]
    `)

    q.enqueue([5, 6, 7])

    const remaining2 = q
    expect([remaining2.next().value, remaining2.next().value]).toMatchInlineSnapshot(`
      [
        5,
        6,
      ]
    `)
})

it('take n queue xs === xs', () => {
    forAll(array(unknown()), (xs) => {
        expect(queue(xs).take(xs.length).toArray()).toEqual(xs)
    })
})

it('take n queue ...xss === xs', () => {
    forAll(array(array(unknown())), (xss) => {
        const vals = queue()
        vals.enqueue(...xss)
        expect(vals.take(xss.map((xs) => xs.length).reduce((a, b) => a + b, 0)).toArray()).toEqual(xss.flat())
    })
})
