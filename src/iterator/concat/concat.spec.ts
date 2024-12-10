import { array, forAll, tuple, unknown } from '../../random/index.js'
import { concat } from './index.js'

import { expect, it } from 'vitest'

it('multiple variadic', () => {
    const foo = concat(['1', '2', '3'], [4, 5, 6], [true, false, true]).toArray()
    expect(foo).toMatchInlineSnapshot(`
        [
          "1",
          "2",
          "3",
          4,
          5,
          6,
          true,
          false,
          true,
        ]
    `)
})

it('multiple variadic 2', () => {
    const a = ['1', '2', '3']
    const b = [4, 5, 6]
    const c = [true, false, true]
    const foo = concat(a, b, c).toArray()
    expect(foo).toMatchInlineSnapshot(`
        [
          "1",
          "2",
          "3",
          4,
          5,
          6,
          true,
          false,
          true,
        ]
    `)
})

it('concat xs ys === xs ++ ys', () => {
    forAll(tuple(array(unknown()), array(unknown())), ([xs, ys]) => {
        expect(concat(xs, ys).toArray()).toEqual([...xs, ...ys])
    })
})

it('concat range 1 3 range 3 7 === 1 ... 6', () => {
    expect(concat([1, 2], [3, 4, 5, 6]).toArray()).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
          5,
          6,
        ]
    `)
})

it('concat abc def === abcdef', () => {
    expect(concat('abc', 'def').toArray()).toMatchInlineSnapshot(`
        [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
        ]
    `)
})

it('concat take 2 repeat 1 take 2 repeat 2 === 1 1 2 2', () => {
    expect(concat(Array.from({ length: 2 }).fill(1), Array.from({ length: 2 }).fill(2)).toArray()).toMatchInlineSnapshot(`
        [
          1,
          1,
          2,
          2,
        ]
    `)
})
