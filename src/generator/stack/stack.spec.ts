import { array, forAll, unknown } from '../../random/index.js'
import { stack } from './index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(stack([1, 2, 3, 4]).toArray()).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
})

it('continued', () => {
    const q = stack([1, 2, 3, 4])
    q.push([5, 6, 7])

    const taken1 = q.take(3)
    expect([taken1.next().value, taken1.next().value, taken1.next().value]).toMatchInlineSnapshot(`
        [
          5,
          6,
          7,
        ]
    `)

    const taken2 = q.take(2)
    expect([taken2.next().value, taken2.next().value]).toMatchInlineSnapshot(`
        [
          1,
          2,
        ]
    `)

    const remaining1 = q
    expect([remaining1.next().value, remaining1.next().value]).toMatchInlineSnapshot(`
        [
          3,
          4,
        ]
    `)

    q.push([5, 6, 7])

    const remaining2 = q
    expect(Array.from(remaining2)).toMatchInlineSnapshot(`
      [
        5,
        6,
        7,
      ]
    `)
})

it('continued 2', () => {
    const q = stack([1])
    q.push([2, 3])
    q.push([4, 5])
    q.push([6, 7])

    const taken1 = q.take(3)
    expect([taken1.next().value, taken1.next().value, taken1.next().value]).toMatchInlineSnapshot(`
        [
          6,
          7,
          4,
        ]
    `)

    const taken2 = q.take(2)
    expect([taken2.next().value, taken2.next().value]).toMatchInlineSnapshot(`
        [
          5,
          2,
        ]
    `)

    const remaining1 = q
    expect([remaining1.next().value, remaining1.next().value]).toMatchInlineSnapshot(`
        [
          3,
          1,
        ]
    `)

    q.push([5, 6, 7])

    const remaining2 = q
    expect(Array.from(remaining2)).toMatchInlineSnapshot(`
      [
        5,
        6,
        7,
      ]
    `)
})

it('take n stack xs === xs', () => {
    forAll(array(unknown()), (xs) => {
        expect(stack(xs).take(xs.length).toArray()).toEqual(xs)
    })
})

it('take n stack.push(...xss) === reverse xs', () => {
    forAll(array(array(unknown())), (xss) => {
        const values = stack()
        values.push(...xss)
        expect(values.take(xss.map((xs) => xs.length).reduce((a, b) => a + b, 0)).toArray()).toEqual(xss.reverse().flat())
    })
})
