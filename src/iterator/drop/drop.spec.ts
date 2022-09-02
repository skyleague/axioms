import { drop, dropWhile } from '.'

import { collect } from '../../array'

describe('drop', () => {
    test('string', () => {
        expect(collect(drop('hello world!', 6))).toMatchInlineSnapshot(`
            [
              "w",
              "o",
              "r",
              "l",
              "d",
              "!",
            ]
        `)
    })

    test('short', () => {
        expect(collect(drop([1, 2], 6))).toMatchInlineSnapshot(`[]`)
    })

    test('negative', () => {
        expect(collect(drop([1, 2], -1))).toMatchInlineSnapshot(`
            [
              1,
              2,
            ]
        `)
    })

    test('zero', () => {
        expect(collect(drop([1, 2], 0))).toMatchInlineSnapshot(`
            [
              1,
              2,
            ]
        `)
    })

    test('simple', () => {
        expect(collect(drop([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))).toMatchInlineSnapshot(`
            [
              6,
              7,
              8,
              9,
              10,
            ]
        `)
    })
})

describe('dropWhile', () => {
    test('simple', () => {
        expect(collect(dropWhile([1, 2, 3, 4, 5, 1, 2, 3], (x) => x < 3))).toMatchInlineSnapshot(`
            [
              3,
              4,
              5,
              1,
              2,
              3,
            ]
        `)
    })

    test('all', () => {
        expect(collect(dropWhile([1, 2, 3], (x) => x < 9))).toMatchInlineSnapshot(`[]`)
    })

    test('none', () => {
        expect(collect(dropWhile([1, 2, 3], (x) => x < 0))).toMatchInlineSnapshot(`
            [
              1,
              2,
              3,
            ]
        `)
    })
})
