import { halves, halvesf, shrinkOne, towards, towardsf } from './index.js'

import { collect } from '../../../array/index.js'
import { take } from '../../../iterator/index.js'

import { expect, describe, it } from 'vitest'

describe('towards', () => {
    it('simple', () => {
        expect(collect(towards(100, 0))).toMatchInlineSnapshot(`
            [
              50,
              75,
              88,
              94,
              97,
              99,
            ]
        `)
    })
    it('negative', () => {
        expect(collect(towards(-21, -50))).toMatchInlineSnapshot(`
            [
              -35,
              -28,
              -24,
              -22,
            ]
        `)
    })
})

describe('halves', () => {
    it('simple', () => {
        expect(collect(halves(15))).toMatchInlineSnapshot(`
            [
              15,
              7,
              3,
              1,
            ]
        `)
    })

    it('large', () => {
        expect(collect(halves(100))).toMatchInlineSnapshot(`
            [
              100,
              50,
              25,
              12,
              6,
              3,
              1,
            ]
        `)
    })

    it('negative', () => {
        expect(collect(halves(-31))).toMatchInlineSnapshot(`
            [
              -31,
              -15,
              -7,
              -3,
              -1,
            ]
        `)
    })
})

describe('towardsf', () => {
    it('simple', () => {
        expect(collect(take(towardsf(0, 100), 7))).toMatchInlineSnapshot(`
            [
              50,
              75,
              87.5,
              93.75,
              96.875,
              98.4375,
              99.21875,
            ]
        `)
    })
    it('negative', () => {
        expect(collect(take(towardsf(-50, -21), 7))).toMatchInlineSnapshot(`
            [
              -35.5,
              -28.25,
              -24.625,
              -22.8125,
              -21.90625,
              -21.453125,
              -21.2265625,
            ]
        `)
    })
})

describe('halvesf', () => {
    it('simple', () => {
        expect(collect(take(halvesf(15), 7))).toMatchInlineSnapshot(`
            [
              15,
              7.5,
              3.75,
              1.875,
              0.9375,
              0.46875,
              0.234375,
            ]
        `)
    })

    it('large', () => {
        expect(collect(take(halvesf(100), 7))).toMatchInlineSnapshot(`
            [
              100,
              50,
              25,
              12.5,
              6.25,
              3.125,
              1.5625,
            ]
        `)
    })

    it('negative', () => {
        expect(collect(take(halvesf(-31), 7))).toMatchInlineSnapshot(`
            [
              -31,
              -15.5,
              -7.75,
              -3.875,
              -1.9375,
              -0.96875,
              -0.484375,
            ]
        `)
    })
})

describe('shrinkOne', () => {
    it('simple', () => {
        expect(collect(shrinkOne([1, 2, 3, 4, 5]))).toMatchInlineSnapshot(`
            [
              [
                [],
                1,
                [
                  2,
                  3,
                  4,
                  5,
                ],
              ],
              [
                [
                  1,
                ],
                2,
                [
                  3,
                  4,
                  5,
                ],
              ],
              [
                [
                  1,
                  2,
                ],
                3,
                [
                  4,
                  5,
                ],
              ],
              [
                [
                  1,
                  2,
                  3,
                ],
                4,
                [
                  5,
                ],
              ],
              [
                [
                  1,
                  2,
                  3,
                  4,
                ],
                5,
                [],
              ],
            ]
        `)
    })
})
