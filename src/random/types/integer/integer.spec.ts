import { integer } from './index.js'

import { dfsPreOrder, showTree } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { all } from '../../../iterator/all/all.js'
import { groupBy, replicate, take } from '../../../iterator/index.js'
import { mapValues } from '../../../object/index.js'
import { arbitraryContext, forAll } from '../../../random/arbitrary/index.js'
import { xoroshiro128plus } from '../../../random/rng/index.js'
import { tuple, natural, constant } from '../index.js'

import { expect, it } from 'vitest'

it('distribution', () => {
    const context = arbitraryContext({
        rng: xoroshiro128plus(42n),
    })

    expect(
        mapValues(
            groupBy(
                replicate(() => integer().sample(context), 1000),
                (x) => x % 10
            ),

            (v) => v.length
        )
    ).toMatchInlineSnapshot(`
      {
        "-1": 56,
        "-2": 53,
        "-3": 47,
        "-4": 61,
        "-5": 43,
        "-6": 56,
        "-7": 51,
        "-8": 34,
        "-9": 48,
        "0": 92,
        "1": 51,
        "2": 59,
        "3": 56,
        "4": 40,
        "5": 58,
        "6": 39,
        "7": 57,
        "8": 50,
        "9": 49,
      }
    `)

    expect(
        mapValues(
            groupBy(
                replicate(() => integer({ min: -100, max: 100 }).sample(context), 1000),
                (x) => Math.floor(x / 10)
            ),

            (v) => v.length
        )
    ).toMatchInlineSnapshot(`
      {
        "-1": 47,
        "-10": 48,
        "-2": 52,
        "-3": 54,
        "-4": 42,
        "-5": 59,
        "-6": 55,
        "-7": 45,
        "-8": 48,
        "-9": 42,
        "0": 47,
        "1": 55,
        "2": 45,
        "3": 59,
        "4": 56,
        "5": 53,
        "6": 44,
        "7": 56,
        "8": 46,
        "9": 47,
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
        { tests: 20000, seed: 42n }
    )
    expect(
        mapValues(
            groupBy(xs, (x) => x),

            (v) => v.length
        )
    ).toMatchInlineSnapshot(`
      {
        "-1": 1445,
        "-10": 1207,
        "-2": 1528,
        "-3": 1470,
        "-4": 518,
        "-5": 514,
        "-6": 503,
        "-7": 476,
        "-8": 1151,
        "-9": 1169,
        "0": 1522,
        "1": 1508,
        "2": 1566,
        "3": 514,
        "4": 512,
        "5": 491,
        "6": 490,
        "7": 1116,
        "8": 1158,
        "9": 1142,
      }
    `)
})

it('counter example - positive', () => {
    expect(() => {
        forAll(integer(), (v) => v > 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 1 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      0]
    `)
})

it('counter example - negative', () => {
    expect(() => {
        forAll(integer(), (v) => v <= 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 4 tests (seed: 42n)
      Shrunk 31 time(s)
      Counter example:

      1]
    `)
})

it('counter example - equal', () => {
    expect(() => {
        forAll(integer(), (v) => v !== 0, { seed: 42n, tests: 2000, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 2 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      0]
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

it('check min constraint', () => {
    forAll(
        integer().chain((min) => {
            return tuple(constant(min), integer({ min }))
        }),
        ([min, x]) => x >= min,
        { seed: 42n }
    )
})

it('check max constraint', () => {
    forAll(
        integer().chain((max) => {
            return tuple(constant(max), integer({ max }))
        }),
        ([max, x]) => x < max,
        { seed: 42n }
    )
})

it.skip('check min constraint - shrinking', () => {
    forAll(
        integer({ max: 100 }).chain((min) => {
            const aint = integer({ min })
            return tuple(constant(min), aint, constant(aint))
        }),
        ([min, x, aint]) => all(dfsPreOrder(aint.shrink(x)), (v) => v >= min),
        { seed: 42n, tests: 10000 }
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
        { seed: 42n, tests: 10000 }
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
                if (a < 1000) return true
                if (b < 1000) return true
                if (b < a) return true
                if (Math.abs(a - b) < 10) return true
                return b - a >= 1000
            },
            { seed: 42n, tests: 2000, timeout: false }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 811 tests (seed: 42n)
      Shrunk 10 time(s)
      Counter example:

      [ 998991, 999001 ]]
    `)
})

it('counter example - symmetric', () => {
    expect(() => {
        forAll(
            tuple(natural({ max: 1000000 }), natural({ max: 1000000 })),
            ([a, b]) => {
                if (a < 1000) return true
                if (b < 1000) return true
                if (Math.abs(a - b) < 10) return true
                return Math.abs(a - b) >= 1000
            },
            { seed: 42n, tests: 2000, timeout: false }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 1271 tests (seed: 42n)
      Shrunk 12 time(s)
      Counter example:

      [ 998976, 997977 ]]
    `)
})

it('random sample', () => {
    const ctx = { rng: xoroshiro128plus(1638968569864n) }
    const aint = integer({ min: 0, max: 1000 })
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10
            )
        )
    ).toMatchInlineSnapshot(`
      [
        550,
        270,
        471,
        36,
        805,
        37,
        79,
        390,
        180,
        148,
      ]
    `)
})
