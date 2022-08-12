import { halves, halvesf, shrinkOne, towards, towardsf } from '.'

import { collect } from '../../../array'
import { take } from '../../../iterator'

describe('towards', () => {
    test('simple', () => {
        expect(collect(towards(100, 0))).toMatchInlineSnapshot(`
                      Array [
                        50,
                        75,
                        88,
                        94,
                        97,
                        99,
                      ]
              `)
    })
    test('negative', () => {
        expect(collect(towards(-21, -50))).toMatchInlineSnapshot(`
                      Array [
                        -35,
                        -28,
                        -24,
                        -22,
                      ]
              `)
    })
})

describe('halves', () => {
    test('simple', () => {
        expect(collect(halves(15))).toMatchInlineSnapshot(`
                      Array [
                        15,
                        7,
                        3,
                        1,
                      ]
              `)
    })

    test('large', () => {
        expect(collect(halves(100))).toMatchInlineSnapshot(`
                      Array [
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

    test('negative', () => {
        expect(collect(halves(-31))).toMatchInlineSnapshot(`
                      Array [
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
    test('simple', () => {
        expect(collect(take(towardsf(0, 100), 7))).toMatchInlineSnapshot(`
            Array [
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
    test('negative', () => {
        expect(collect(take(towardsf(-50, -21), 7))).toMatchInlineSnapshot(`
            Array [
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
    test('simple', () => {
        expect(collect(take(halvesf(15), 7))).toMatchInlineSnapshot(`
            Array [
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

    test('large', () => {
        expect(collect(take(halvesf(100), 7))).toMatchInlineSnapshot(`
            Array [
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

    test('negative', () => {
        expect(collect(take(halvesf(-31), 7))).toMatchInlineSnapshot(`
            Array [
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
    test('simple', () => {
        expect(collect(shrinkOne([1, 2, 3, 4, 5]))).toMatchInlineSnapshot(`
            Array [
              Array [
                Array [],
                1,
                Array [
                  2,
                  3,
                  4,
                  5,
                ],
              ],
              Array [
                Array [
                  1,
                ],
                2,
                Array [
                  3,
                  4,
                  5,
                ],
              ],
              Array [
                Array [
                  1,
                  2,
                ],
                3,
                Array [
                  4,
                  5,
                ],
              ],
              Array [
                Array [
                  1,
                  2,
                  3,
                ],
                4,
                Array [
                  5,
                ],
              ],
              Array [
                Array [
                  1,
                  2,
                  3,
                  4,
                ],
                5,
                Array [],
              ],
            ]
        `)
    })
})
