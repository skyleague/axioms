import { mapValues } from '../../../object/index.js'
import { arbitraryContext, forAll } from '../../arbitrary/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { tuple } from '../index.js'
import { natural } from './index.js'

import { expect, it } from 'vitest'

it('distribution', () => {
    const context = arbitraryContext({
        rng: xoroshiro128plus(42n),
    })

    expect(
        mapValues(
            Object.groupBy(
                Array.from({ length: 1000 }, () => natural().sample(context)),
                (x) => x % 10,
            ),
            (v) => v?.length,
        ),
    ).toMatchInlineSnapshot(`
      {
        "0": 88,
        "1": 117,
        "2": 91,
        "3": 105,
        "4": 100,
        "5": 99,
        "6": 84,
        "7": 117,
        "8": 105,
        "9": 94,
      }
    `)

    expect(
        mapValues(
            Object.groupBy(
                Array.from({ length: 1000 }, () => natural({ min: 0, max: 100 }).sample(context)),
                (x) => Math.floor(x / 10),
            ),
            (v) => v?.length,
        ),
    ).toMatchInlineSnapshot(`
      {
        "0": 89,
        "1": 92,
        "10": 10,
        "2": 112,
        "3": 97,
        "4": 97,
        "5": 101,
        "6": 100,
        "7": 109,
        "8": 100,
        "9": 93,
      }
    `)
})

it('counter example - positive', () => {
    expect(() => {
        forAll(natural({ max: 20 }), (v) => v > 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 44 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      0

      ]
    `)
})

it('counter example - negative', () => {
    expect(() => {
        forAll(natural(), (v) => v <= 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 1 tests (seed: 42n)
      Shrunk 3 time(s)
      Counter example:

      1

      ]
    `)
})

it('counter example - equal', () => {
    expect(() => {
        forAll(natural({ max: 20 }), (v) => v !== 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 44 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      0

      ]
    `)
})

// next two tests are heavily inspired by https://github.com/dubzzz/fast-check/blob/e645c3612fc76055ea0f5bab1a80c6c73ecfc1af/test/e2e/ComplexShrink.spec.ts
it('counter example - asymmetric', () => {
    expect(() => {
        forAll(
            tuple(natural({ max: 1000000 }), natural({ max: 1000000 })),
            ([a, b]) => {
                if (a < 1000) {
                    return true
                }
                if (b < 1000) {
                    return true
                }
                if (b < a) {
                    return true
                }
                if (Math.abs(a - b) < 10) {
                    return true
                }
                return b - a >= 1000
            },
            { seed: 42n, tests: 2000, timeout: false },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 130 tests (seed: 42n)
      Shrunk 7 time(s)
      Counter example:

      [ 999001, 999011 ]

      ]
    `)
})

it('counter example - symmetric', () => {
    expect(() => {
        forAll(
            tuple(natural({ max: 1000000 }), natural({ max: 1000000 })),
            ([a, b]) => {
                if (a < 1000) {
                    return true
                }
                if (b < 1000) {
                    return true
                }
                if (Math.abs(a - b) < 10) {
                    return true
                }
                return Math.abs(a - b) >= 1000
            },
            { seed: 42n, tests: 2000, timeout: false },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 130 tests (seed: 42n)
      Shrunk 6 time(s)
      Counter example:

      [ 999001, 998002 ]

      ]
    `)
})

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = natural({ min: 0, max: 1000 })
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        551,
        270,
        471,
        36,
        806,
        38,
        79,
        391,
        180,
        149,
      ]
    `)
})
