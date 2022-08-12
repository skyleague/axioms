import { take, takeWhile } from '.'

import { collect } from '../../array'
import { repeat, range } from '../../generator'

describe('take', () => {
    test('string', () => {
        expect(collect(take('hello world!', 5))).toMatchInlineSnapshot(`
        Array [
          "h",
          "e",
          "l",
          "l",
          "o",
        ]
    `)
    })

    test('short', () => {
        expect(collect(take([1, 2], 6))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
        ]
    `)
    })

    test('empty', () => {
        expect(collect(take([], 6))).toMatchInlineSnapshot(`Array []`)
    })

    test('negative', () => {
        expect(collect(take([1, 2], -1))).toMatchInlineSnapshot(`Array []`)
    })

    test('zero', () => {
        expect(collect(take([1, 2], 0))).toMatchInlineSnapshot(`Array []`)
    })

    test('simple', () => {
        expect(collect(take([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
          5,
        ]
    `)
    })

    test('repeat', () => {
        expect(collect(take(repeat('foo'), 5))).toMatchInlineSnapshot(`
        Array [
          "foo",
          "foo",
          "foo",
          "foo",
          "foo",
        ]
    `)
    })
})

describe('takeWhile', () => {
    test('simple', () => {
        expect(collect(takeWhile([1, 2, 3, 4, 5, 1, 2, 3], (x) => x < 3))).toMatchInlineSnapshot(`
            Array [
              1,
              2,
            ]
        `)
    })

    test('all', () => {
        expect(collect(takeWhile([1, 2, 3], (x) => x < 9))).toMatchInlineSnapshot(`
            Array [
              1,
              2,
              3,
            ]
        `)
    })

    test('none', () => {
        expect(collect(takeWhile([1, 2, 3], (x) => x < 0))).toMatchInlineSnapshot(`Array []`)
    })

    test('large size', () => {
        expect(collect(takeWhile(range(32768), (x) => x < 32700))).toEqual(collect(range(32700)))
    })

    test('vs for loop', () => {
        const arr = []
        for (const x of range(32768)) {
            if (x >= 32700) {
                break
            }
            arr.push(x)
        }
        expect(arr).toEqual(collect(range(32700)))
    })
})
