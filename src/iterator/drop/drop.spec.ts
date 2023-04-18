import { drop, dropWhile } from './index.js'

import { collect } from '../../array/index.js'

import { expect, describe, it } from 'vitest'

describe('drop', () => {
    it('string', () => {
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

    it('short', () => {
        expect(collect(drop([1, 2], 6))).toMatchInlineSnapshot(`[]`)
    })

    it('negative', () => {
        expect(collect(drop([1, 2], -1))).toMatchInlineSnapshot(`
            [
              1,
              2,
            ]
        `)
    })

    it('zero', () => {
        expect(collect(drop([1, 2], 0))).toMatchInlineSnapshot(`
            [
              1,
              2,
            ]
        `)
    })

    it('simple', () => {
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
    it('simple', () => {
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

    it('all', () => {
        expect(collect(dropWhile([1, 2, 3], (x) => x < 9))).toMatchInlineSnapshot(`[]`)
    })

    it('none', () => {
        expect(collect(dropWhile([1, 2, 3], (x) => x < 0))).toMatchInlineSnapshot(`
            [
              1,
              2,
              3,
            ]
        `)
    })
})
