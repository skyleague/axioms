import { describe, expect, it } from 'vitest'
import { halves, halvesf, splits, towards, towardsf } from './shrink.js'

describe('towards', () => {
    it('simple', () => {
        expect(towards(100, 0)).toEqual([0, 50, 75, 88, 94, 97, 99])
    })
    it('simple 2', () => {
        expect(towards(1000, 500)).toEqual([500, 750, 875, 938, 969, 985, 993, 997, 999])
    })
    it('simple 3', () => {
        expect(towards(-26, -50)).toEqual([-50, -38, -32, -29, -27])
    })
    it('simple 4', () => {
        expect(towards(15, 0)).toEqual([0, 8, 12, 14])
        expect(towards(14, 0)).toEqual([0, 7, 11, 13])
    })
    it('negative', () => {
        expect(towards(-21, -50)).toMatchInlineSnapshot(`
          [
            -50,
            -35,
            -28,
            -24,
            -22,
          ]
        `)
    })
    it('small', () => {
        expect(towards(5, 0)).toMatchInlineSnapshot(`
          [
            0,
            3,
            4,
          ]
        `)
    })
})

describe('halves', () => {
    it('simple', () => {
        expect(halves(15)).toMatchInlineSnapshot(`
          [
            15,
            7,
            3,
            1,
          ]
        `)
    })

    it('large', () => {
        expect(halves(100)).toMatchInlineSnapshot(`
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
        expect(halves(-31)).toMatchInlineSnapshot(`
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
        expect(towardsf(0, 100).take(7).toArray()).toMatchInlineSnapshot(`
        [
          0,
          50,
          75,
          87.5,
          93.75,
          96.875,
          98.4375,
        ]
      `)
    })
    it('simple 2', () => {
        expect(towardsf(1, 0.5).take(7).toArray()).toMatchInlineSnapshot(`
          [
            1,
            0.75,
            0.625,
            0.5625,
            0.53125,
            0.515625,
            0.5078125,
          ]
        `)
    })
    it('negative', () => {
        expect(towardsf(-50, -21).take(7).toArray()).toMatchInlineSnapshot(`
          [
            -50,
            -35.5,
            -28.25,
            -24.625,
            -22.8125,
            -21.90625,
            -21.453125,
          ]
        `)
    })
})

describe('halvesf', () => {
    it('simple', () => {
        expect(halvesf(15).take(7).toArray()).toMatchInlineSnapshot(`
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
        expect(halvesf(100).take(7).toArray()).toMatchInlineSnapshot(`
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
        expect(halvesf(-31).take(7).toArray()).toMatchInlineSnapshot(`
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

describe('splits', () => {
    it('simple', () => {
        expect(splits([1, 2, 3, 4, 5]).toArray()).toMatchInlineSnapshot(`
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
