import { take, takeWhile } from './index.js'

import { collect } from '../../array/index.js'
import { range, repeat } from '../../generator/index.js'

import { describe, expect, it } from 'vitest'

describe('take', () => {
    it('string', () => {
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

    it('short', () => {
        expect(collect(take([1, 2], 6))).toMatchInlineSnapshot(`
            [
              1,
              2,
            ]
        `)
    })

    it('empty', () => {
        expect(collect(take([], 6))).toMatchInlineSnapshot('[]')
    })

    it('negative', () => {
        expect(collect(take([1, 2], -1))).toMatchInlineSnapshot('[]')
    })

    it('zero', () => {
        expect(collect(take([1, 2], 0))).toMatchInlineSnapshot('[]')
    })

    it('simple', () => {
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

    it('repeat', () => {
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
    it('simple', () => {
        expect(collect(takeWhile([1, 2, 3, 4, 5, 1, 2, 3], (x) => x < 3))).toMatchInlineSnapshot(`
            [
              1,
              2,
            ]
        `)
    })

    it('all', () => {
        expect(collect(takeWhile([1, 2, 3], (x) => x < 9))).toMatchInlineSnapshot(`
            [
              1,
              2,
              3,
            ]
        `)
    })

    it('none', () => {
        expect(collect(takeWhile([1, 2, 3], (x) => x < 0))).toMatchInlineSnapshot('[]')
    })

    it('large size', () => {
        expect(collect(takeWhile(range(32768), (x) => x < 32700))).toEqual(collect(range(32700)))
    })

    it('vs for loop', () => {
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
