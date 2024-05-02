import { integer } from './index.js'

import { dfsPreOrder, showTree } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { all } from '../../../iterator/all/all.js'
import { groupBy, replicate, take } from '../../../iterator/index.js'
import { mapValues } from '../../../object/index.js'
import { arbitraryContext, forAll } from '../../../random/arbitrary/index.js'
import { xoroshiro128plus } from '../../../random/rng/index.js'
import { constant, natural, tuple } from '../index.js'

import { expect, it } from 'vitest'

it('distribution', () => {
    const context = arbitraryContext({
        rng: xoroshiro128plus(42n),
    })

    expect(
        mapValues(
            groupBy(
                replicate(() => integer().sample(context), 1000),
                (x) => x % 10,
            ),

            (v) => v.length,
        ),
    ).toMatchInlineSnapshot(`
      {
        "-1": 52,
        "-2": 57,
        "-3": 45,
        "-4": 63,
        "-5": 46,
        "-6": 51,
        "-7": 49,
        "-8": 42,
        "-9": 42,
        "0": 97,
        "1": 46,
        "2": 52,
        "3": 61,
        "4": 49,
        "5": 46,
        "6": 57,
        "7": 43,
        "8": 58,
        "9": 44,
      }
    `)

    expect(
        mapValues(
            groupBy(
                replicate(() => integer({ min: -100, max: 100 }).sample(context), 1000),
                (x) => Math.floor(x / 10),
            ),

            (v) => v.length,
        ),
    ).toMatchInlineSnapshot(`
      {
        "-1": 47,
        "-10": 48,
        "-2": 50,
        "-3": 56,
        "-4": 41,
        "-5": 59,
        "-6": 54,
        "-7": 46,
        "-8": 47,
        "-9": 41,
        "0": 48,
        "1": 52,
        "10": 6,
        "2": 47,
        "3": 56,
        "4": 56,
        "5": 53,
        "6": 49,
        "7": 52,
        "8": 49,
        "9": 43,
      }
    `)
})

it('distribution - small numbers', () => {
    const xs: number[] = []

    forAll(
        integer({ min: -10, max: 10 }),
        (x) => {
            xs.push(x)
        },
        { tests: 20000, seed: 42n },
    )
    expect(
        mapValues(
            groupBy(xs, (x) => x),

            (v) => v.length,
        ),
    ).toMatchInlineSnapshot(`
      {
        "-1": 1307,
        "-10": 985,
        "-2": 1345,
        "-3": 1309,
        "-4": 510,
        "-5": 476,
        "-6": 482,
        "-7": 959,
        "-8": 970,
        "-9": 994,
        "0": 1301,
        "1": 1411,
        "10": 962,
        "2": 1338,
        "3": 1356,
        "4": 511,
        "5": 459,
        "6": 475,
        "7": 958,
        "8": 903,
        "9": 989,
      }
    `)
})

it('counter example - positive', () => {
    expect(() => {
        forAll(integer(), (v) => v > 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 1 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      0

      ]
    `)
})

it('counter example - negative', () => {
    expect(() => {
        forAll(integer(), (v) => v <= 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 4 tests (seed: 42n)
      Shrunk 31 time(s)
      Counter example:

      1

      ]
    `)
})

it('counter example - equal', () => {
    expect(() => {
        forAll(integer(), (v) => v !== 0, { seed: 42n, tests: 2000, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 2 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      0

      ]
    `)
})

it('show small tree', () => {
    expect(showTree(integer({ min: 0, max: 10 }).shrink(5), { maxDepth: 6 })).toMatchInlineSnapshot(`
      "└─ 5
          ├─ 0
          ├─ 3
          |   └─ 2
          |       └─ 1
          └─ 4"
    `)
})

it('show small tree 2', () => {
    // https://github.com/hedgehogqa/haskell-hedgehog/pull/413
    expect(showTree(integer({ min: 0, max: 10 }).shrink(7), { maxDepth: 6 })).toMatchInlineSnapshot(`
      "└─ 7
          ├─ 0
          ├─ 4
          |   ├─ 2
          |   |   └─ 1
          |   └─ 3
          └─ 6
              └─ 5"
    `)
    expect(showTree(integer({ min: -10, max: 0 }).shrink(-7), { maxDepth: 6 })).toMatchInlineSnapshot(`
      "└─ -7
          ├─ 0
          ├─ -4
          |   ├─ -2
          |   |   └─ -1
          |   └─ -3
          └─ -6
              └─ -5"
    `)
    expect(showTree(integer().shrink(15), { maxDepth: 6 })).toMatchInlineSnapshot(`
      "└─ 15
          ├─ 0
          ├─ 8
          |   ├─ 4
          |   |   ├─ 2
          |   |   |   └─ 1
          |   |   └─ 3
          |   ├─ 6
          |   |   └─ 5
          |   └─ 7
          ├─ 12
          |   ├─ 10
          |   |   └─ 9
          |   └─ 11
          └─ 14
              └─ 13"
    `)
    expect(showTree(integer().shrink(16), { maxDepth: 6 })).toMatchInlineSnapshot(`
      "└─ 16
          ├─ 0
          ├─ 8
          |   ├─ 4
          |   |   ├─ 2
          |   |   |   └─ 1
          |   |   └─ 3
          |   ├─ 6
          |   |   └─ 5
          |   └─ 7
          ├─ 12
          |   ├─ 10
          |   |   └─ 9
          |   └─ 11
          ├─ 14
          |   └─ 13
          └─ 15"
    `)
})

it('check min constraint - inclusive', () => {
    forAll(
        integer({ min: 0, max: 100 }).chain((min) => {
            return tuple(constant(min), integer({ min }))
        }),
        ([min, x]) => x >= min,
        { seed: 42n },
    )
})

it('check max constraint - inclusive', () => {
    forAll(
        integer({ min: 0, max: 100 }).chain((max) => {
            return tuple(constant(max), integer({ max }))
        }),
        ([max, x]) => x <= max,
        { seed: 42n },
    )
})

it('check min constraint - exclusive', () => {
    forAll(
        integer({ min: 0, max: 100 }).chain((min) => {
            return tuple(constant(min), integer({ min, minInclusive: false }))
        }),
        ([min, x]) => x >= min,
        { seed: 42n },
    )
})

it('check max constraint - exclusive', () => {
    forAll(
        integer({ min: 0, max: 10 }).chain((max) => {
            return tuple(constant(max), integer({ max, maxInclusive: false }))
        }),
        ([max, x]) => x < max,
        { seed: 42n },
    )
})

it.skip('check min constraint - shrinking', () => {
    forAll(
        integer({ max: 100 }).chain((min) => {
            const aint = integer({ min })
            return tuple(constant(min), aint, constant(aint))
        }),
        ([min, x, aint]) => all(dfsPreOrder(aint.shrink(x)), (v) => v > min),
        { seed: 42n, tests: 10000 },
    )
})

it.skip('check max constraint - shrinking', () => {
    forAll(
        integer({ max: 100 })
            .map((i) => i + 1)
            .chain((max) => {
                const aint = integer({ max })
                return tuple(constant(max), aint, constant(aint))
            }),
        ([max, x, aint]) => all(dfsPreOrder(aint.shrink(x)), (v) => v < max),
        { seed: 42n, tests: 10000 },
    )
})

it.skip('check max constraint - shrinking 2', () => {
    const aint = integer({ min: 0, max: 1 })
    forAll(aint, (x) => all(dfsPreOrder(aint.shrink(x)), (v) => v === 0 && x === 0), { seed: 42n })
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
    const aint = integer({ min: 0, max: 1000 })
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10,
            ),
        ),
    ).toMatchInlineSnapshot(`
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

it('cardinality', () => {
    expect(integer({ min: 0, max: 1000 }).supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('1001')
})
