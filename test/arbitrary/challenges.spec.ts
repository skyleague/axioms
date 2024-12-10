import { equal } from '../../src/iterator/index.js'
import { array, constant, forAll, integer, natural, tuple } from '../../src/random/index.js'

import { expect, it } from 'vitest'

// https://github.com/jlink/shrinking-challenge
it('bound 5', () => {
    const sum16 = (a: number, b: number) => {
        let s = a + b
        while (s > 32767) {
            s -= 65536
        }
        while (s < -32768) {
            s += 65536
        }
        return s
    }

    const boundedList = array(integer({ min: -32768, max: 32767 })).filter((x) => x.reduce(sum16, 0) < 256)
    expect(() => {
        forAll(
            tuple(boundedList, boundedList, boundedList, boundedList, boundedList),
            (xs) => xs.flat().reduce(sum16, 0) < 5 * 256,
            { seed: 42n, timeout: false, tests: 5000 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 4673 tests (seed: 42n)
      Shrunk 2 time(s)
      Counter example:

      [ [], [ -9 ], [], [ -32760 ], [] ]

      ]
    `)
})

it('coupling', () => {
    expect(() => {
        forAll(
            array(natural({ max: 10 })).filter((xs) => xs.every((v) => v < xs.length)),
            (xs) => {
                for (let i = 0; i !== xs.length; ++i) {
                    const j = xs[i]!
                    if (i !== j && xs[j]! === i) {
                        return false
                    }
                }
                return true
            },
            { seed: 42n, timeout: false, tests: 100 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 5 tests (seed: 42n)
      Shrunk 7 time(s)
      Counter example:

      [ 1, 0 ]

      ]
    `)
})

it('deletion', () => {
    expect(() => {
        forAll(
            tuple(array(integer()), natural({ max: 10 })).filter(([xs, i]) => i < xs.length),
            ([xs, i]) => {
                const x = xs[i]!
                const copyWithoutX = [...xs.slice(0, i), ...xs.slice(i + 1)]
                return !copyWithoutX.includes(x)
            },
            { seed: 42n, timeout: false, tests: 100 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 54 tests (seed: 42n)
      Shrunk 5 time(s)
      Counter example:

      [ [ 0, 0 ], 0 ]

      ]
    `)
})

it('difference 1', () => {
    expect(() => {
        forAll(
            tuple(natural(), natural()),
            ([x, y]) => {
                return x < 10 || x !== y
            },
            { seed: 42n, timeout: false, tests: 100 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 67 tests (seed: 42n)
      Shrunk 29 time(s)
      Counter example:

      [ 10, 10 ]

      ]
    `)
})

it('difference 2', () => {
    expect(() => {
        forAll(
            tuple(natural(), natural()),
            ([x, y]) => {
                const diff = Math.abs(x - y)
                return x < 10 || (1 < diff && diff > 4)
            },
            { seed: 42n, timeout: false, tests: 100 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 28 tests (seed: 42n)
      Shrunk 6 time(s)
      Counter example:

      [ 10, 6 ]

      ]
    `)
})

it('difference 3', () => {
    expect(() => {
        forAll(
            tuple(natural(), natural()),
            ([x, y]) => {
                const diff = Math.abs(x - y)
                return x < 10 || diff !== 1
            },

            { seed: 42n, timeout: false, tests: 300 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 207 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      [ 10, 9 ]

      ]
    `)
})

it('distinct', () => {
    expect(() => {
        forAll(
            array(integer()),
            (xs) => {
                return new Set(xs).size < 3
            },
            { seed: 42n, timeout: false, tests: 100 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 2 tests (seed: 42n)
      Shrunk 65 time(s)
      Counter example:

      [ 0, 1, 2 ]

      ]
    `)
})

it('nested list', () => {
    expect(() => {
        forAll(
            array(array(constant(0))),
            (xs) => {
                return xs.map((l) => l.length).reduce((a, b) => a + b, 0) <= 10
            },
            { seed: 42n, timeout: false, tests: 100 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 3 tests (seed: 42n)
      Shrunk 2 time(s)
      Counter example:

      [ [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ]

      ]
    `)
})

it('length list', () => {
    expect(() => {
        forAll(
            integer({ min: 1, max: 100 }).chain((n) => tuple(...Array.from({ length: n }, () => natural({ max: 1000 })))),
            (xs) => {
                return xs.reduce((a, b) => Math.max(a, b), 0) < 900
            },
            { seed: 42n, timeout: false, tests: 100 },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 18 tests (seed: 42n)
      Shrunk 4 time(s)
      Counter example:

      [ 900 ]

      ]
    `)
})

it('large union list', () => {
    expect(() => {
        forAll(array(array(integer())), (xs) => new Set(xs.flat()).size < 5, { seed: 42n, timeout: false, tests: 200 })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 20 tests (seed: 42n)
      Shrunk 124 time(s)
      Counter example:

      [ [ 0, 1, 2, 3, 4 ] ]

      ]
    `)
})

it('reverse', () => {
    expect(() => {
        forAll(array(integer()), (xs) => equal(xs, [...xs].reverse()), { seed: 42n, timeout: false, tests: 100 })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 3 tests (seed: 42n)
      Shrunk 30 time(s)
      Counter example:

      [ 0, 1 ]

      ]
    `)
})
