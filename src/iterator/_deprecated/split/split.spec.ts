import { splitAt, splitLast } from './index.js'

import { collect } from '../../../array/index.js'
import { maybeAsValue } from '../../../data/index.js'

import { describe, expect, it } from 'vitest'
describe('splitAt', () => {
    it('string', () => {
        const [init, rest] = splitAt('hello world!', 6)
        expect(init).toMatchInlineSnapshot(`
                    [
                      "h",
                      "e",
                      "l",
                      "l",
                      "o",
                      " ",
                    ]
            `)
        expect(collect(rest)).toMatchInlineSnapshot(`
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

    it('simple 1', () => {
        const [init, rest] = splitAt([1, 2, 3], 1)
        expect(init).toMatchInlineSnapshot(`
                    [
                      1,
                    ]
            `)
        expect(collect(rest)).toMatchInlineSnapshot(`
                    [
                      2,
                      3,
                    ]
            `)
    })

    it('simple 2', () => {
        const [init, rest] = splitAt([1, 2, 3], 3)
        expect(init).toMatchInlineSnapshot(`
                    [
                      1,
                      2,
                      3,
                    ]
            `)
        expect(collect(rest)).toMatchInlineSnapshot('[]')
    })

    it('over', () => {
        const [init, rest] = splitAt([1, 2, 3], 4)
        expect(init).toMatchInlineSnapshot(`
                    [
                      1,
                      2,
                      3,
                    ]
            `)
        expect(collect(rest)).toMatchInlineSnapshot('[]')
    })

    it('negative', () => {
        const [init, rest] = splitAt([1, 2, 3], -1)
        expect(init).toMatchInlineSnapshot('[]')
        expect(collect(rest)).toMatchInlineSnapshot(`
                    [
                      1,
                      2,
                      3,
                    ]
            `)
    })

    it('zero', () => {
        const [init, rest] = splitAt([1, 2, 3], 0)
        expect(init).toMatchInlineSnapshot('[]')
        expect(collect(rest)).toMatchInlineSnapshot(`
                    [
                      1,
                      2,
                      3,
                    ]
            `)
    })

    it('simple', () => {
        const [init, rest] = splitAt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)
        expect(init).toMatchInlineSnapshot(`
                    [
                      1,
                      2,
                      3,
                      4,
                      5,
                    ]
            `)
        expect(collect(rest)).toMatchInlineSnapshot(`
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

describe('splitLast', () => {
    it('simple', () => {
        const [rest, last] = splitLast('hello')
        expect(collect(rest)).toMatchInlineSnapshot(`
            [
              "h",
              "e",
              "l",
              "l",
            ]
        `)
        expect(maybeAsValue(last)).toMatchInlineSnapshot(`"o"`)
    })
})
