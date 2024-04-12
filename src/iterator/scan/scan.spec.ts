import { scanl, scanl1 } from './index.js'

import { describe, expect, it } from 'vitest'

describe('scanl', () => {
    const div = (a: number, b: number) => a / b
    const max = (a: number, b: number) => Math.max(a, b)
    it('divide', () => {
        expect([...scanl([4, 2, 4], div, 64)]).toMatchInlineSnapshot(`
            [
              64,
              16,
              8,
              2,
            ]
        `)
    })

    it('empty input', () => {
        expect([...scanl([], div, 3)]).toMatchInlineSnapshot(`
            [
              3,
            ]
        `)
    })

    it('max', () => {
        expect([...scanl([1, 2, 3, 4], max, 5)]).toMatchInlineSnapshot(`
            [
              5,
              5,
              5,
              5,
              5,
            ]
        `)
    })

    it('max 2', () => {
        expect([...scanl([1, 2, 3, 4, 5, 6, 7], max, 5)]).toMatchInlineSnapshot(`
            [
              5,
              5,
              5,
              5,
              5,
              5,
              6,
              7,
            ]
        `)
    })

    it('lambda', () => {
        expect([...scanl([1, 2, 3, 4, 5, 6, 7], (x, y) => 2 * x + y, 5)]).toMatchInlineSnapshot(`
            [
              5,
              11,
              24,
              51,
              106,
              217,
              440,
              887,
            ]
        `)
    })
})

describe('scanl1', () => {
    const plus = (a: number, b: number) => a + b
    const div = (a: number, b: number) => a / b
    it('plus', () => {
        expect([...scanl1([1, 2, 3, 4], plus)]).toMatchInlineSnapshot(`
            [
              1,
              3,
              6,
              10,
            ]
        `)
    })

    it('divide', () => {
        expect([...scanl1([64, 4, 2, 8], div)]).toMatchInlineSnapshot(`
            [
              64,
              16,
              8,
              1,
            ]
        `)
    })

    it('single input', () => {
        expect([...scanl1([12], div)]).toMatchInlineSnapshot(`
            [
              12,
            ]
        `)
    })

    it('and', () => {
        expect([...scanl1([3 > 1, 3 > 2, 4 > 6, true], (a, b) => a && b)]).toMatchInlineSnapshot(`
            [
              true,
              true,
              false,
              false,
            ]
        `)
    })
})
