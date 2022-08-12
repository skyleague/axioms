import { scanl, scanl1 } from '.'

describe('scanl', () => {
    const div = (a: number, b: number) => a / b
    const max = (a: number, b: number) => Math.max(a, b)
    test('divide', () => {
        expect([...scanl([4, 2, 4], div, 64)]).toMatchInlineSnapshot(`
                Array [
                  64,
                  16,
                  8,
                  2,
                ]
        `)
    })

    test('empty input', () => {
        expect([...scanl([], div, 3)]).toMatchInlineSnapshot(`
                      Array [
                        3,
                      ]
              `)
    })

    test('max', () => {
        expect([...scanl([1, 2, 3, 4], max, 5)]).toMatchInlineSnapshot(`
                      Array [
                        5,
                        5,
                        5,
                        5,
                        5,
                      ]
              `)
    })

    test('max 2', () => {
        expect([...scanl([1, 2, 3, 4, 5, 6, 7], max, 5)]).toMatchInlineSnapshot(`
                    Array [
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

    test('lambda', () => {
        expect([...scanl([1, 2, 3, 4, 5, 6, 7], (x, y) => 2 * x + y, 5)]).toMatchInlineSnapshot(`
                      Array [
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
    test('plus', () => {
        expect([...scanl1([1, 2, 3, 4], plus)]).toMatchInlineSnapshot(`
            Array [
              1,
              3,
              6,
              10,
            ]
        `)
    })

    test('divide', () => {
        expect([...scanl1([64, 4, 2, 8], div)]).toMatchInlineSnapshot(`
            Array [
              64,
              16,
              8,
              1,
            ]
        `)
    })

    test('single input', () => {
        expect([...scanl1([12], div)]).toMatchInlineSnapshot(`
            Array [
              12,
            ]
        `)
    })

    test('and', () => {
        expect([...scanl1([3 > 1, 3 > 2, 4 > 6, 5 === 5], (a, b) => a && b)]).toMatchInlineSnapshot(`
            Array [
              true,
              true,
              false,
              false,
            ]
        `)
    })
})
