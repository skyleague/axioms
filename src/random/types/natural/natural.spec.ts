import { natural } from './index.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { groupBy, replicate, take } from '../../../iterator/index.js'
import { mapValues } from '../../../object/index.js'
import { arbitraryContext, forAll } from '../../arbitrary/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { tuple } from '../index.js'

import { expect, it } from 'vitest'

it('distribution', () => {
    const context = arbitraryContext({
        rng: xoroshiro128plus(42n),
    })

    expect(
        mapValues(
            groupBy(
                replicate(() => natural().sample(context), 1000),
                (x) => x % 10
            ),

            (v) => v.length
        )
    ).toMatchInlineSnapshot(`
      {
        "0": 110,
        "1": 99,
        "2": 99,
        "3": 112,
        "4": 100,
        "5": 90,
        "6": 98,
        "7": 105,
        "8": 96,
        "9": 91,
      }
    `)

    expect(
        mapValues(
            groupBy(
                replicate(() => natural({ min: 0, max: 100 }).sample(context), 1000),
                (x) => Math.floor(x / 10)
            ),

            (v) => v.length
        )
    ).toMatchInlineSnapshot(`
      {
        "0": 90,
        "1": 93,
        "2": 114,
        "3": 96,
        "4": 99,
        "5": 102,
        "6": 104,
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
      [FalsifiedError: Counter example found after 44 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      0]
    `)
})

it('counter example - negative', () => {
    expect(() => {
        forAll(natural(), (v) => v <= 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 1 tests (seed: 42n)
      Shrunk 3 time(s)
      Counter example:

      1]
    `)
})

it('counter example - equal', () => {
    expect(() => {
        forAll(natural({ max: 20 }), (v) => v !== 0, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 44 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      0]
    `)
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
    const aint = natural({ min: 0, max: 1000 })
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
