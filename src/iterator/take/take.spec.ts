import { take, takeWhile } from './index.js'

import { collect } from '../../array/index.js'
import { repeat, range } from '../../generator/index.js'

describe('take', () => {
    test('string', () => {
        expect(collect(take('hello world!', 5))).toMatchInlineSnapshot(`
            [
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
            [
              1,
              2,
            ]
        `)
    })

    test('empty', () => {
        expect(collect(take([], 6))).toMatchInlineSnapshot(`[]`)
    })

    test('negative', () => {
        expect(collect(take([1, 2], -1))).toMatchInlineSnapshot(`[]`)
    })

    test('zero', () => {
        expect(collect(take([1, 2], 0))).toMatchInlineSnapshot(`[]`)
    })

    test('simple', () => {
        expect(collect(take([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))).toMatchInlineSnapshot(`
            [
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
            [
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
            [
              1,
              2,
            ]
        `)
    })

    test('all', () => {
        expect(collect(takeWhile([1, 2, 3], (x) => x < 9))).toMatchInlineSnapshot(`
            [
              1,
              2,
              3,
            ]
        `)
    })

    test('none', () => {
        expect(collect(takeWhile([1, 2, 3], (x) => x < 0))).toMatchInlineSnapshot(`[]`)
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
