import { natural } from '.'

import { tuple } from '..'
import { collect } from '../../../array'
import { repeat } from '../../../generator'
import { groupBy, replicate, take } from '../../../iterator'
import { mapValues } from '../../../object'
import { arbitraryContext, forAll } from '../../arbitrary'
import { xoroshiro128plus } from '../../rng'

test('distribution', () => {
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
          "0": 103,
          "1": 107,
          "2": 93,
          "3": 110,
          "4": 110,
          "5": 88,
          "6": 110,
          "7": 96,
          "8": 81,
          "9": 102,
        }
    `)
})

test('counter example - positive', () => {
    expect(() => forAll(natural({ max: 20 }), (v) => v > 0, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 2 tests (seed: 42n)
        Shrunk 1 time(s)
        Counter example:

        0"
    `)
})

test('counter example - negative', () => {
    expect(() => forAll(natural(), (v) => v <= 0, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 1 tests (seed: 42n)
        Shrunk 31 time(s)
        Counter example:

        1"
    `)
})

test('counter example - equal', () => {
    expect(() => forAll(natural({ max: 20 }), (v) => v !== 0, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 2 tests (seed: 42n)
        Shrunk 1 time(s)
        Counter example:

        0"
    `)
})

// next two tests are heavily inspired by https://github.com/dubzzz/fast-check/blob/e645c3612fc76055ea0f5bab1a80c6c73ecfc1af/test/e2e/ComplexShrink.spec.ts
test('counter example - asymmetric', () => {
    expect(() =>
        forAll(
            tuple(natural({ max: 1000000 }), natural({ max: 1000000 })),
            ([a, b]) => {
                if (a < 1000) return true
                if (b < 1000) return true
                if (b < a) return true
                if (Math.abs(a - b) < 10) return true
                return b - a >= 1000
            },
            { seed: 42n, tests: 2000 }
        )
    ).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 1025 tests (seed: 42n)
        Shrunk 9 time(s)
        Counter example:

        [ 748374, 748384 ]"
    `)
})

test('counter example - symmetric', () => {
    expect(() =>
        forAll(
            tuple(natural({ max: 1000000 }), natural({ max: 1000000 })),
            ([a, b]) => {
                if (a < 1000) return true
                if (b < 1000) return true
                if (Math.abs(a - b) < 10) return true
                return Math.abs(a - b) >= 1000
            },
            { seed: 42n, tests: 2000 }
        )
    ).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 1001 tests (seed: 42n)
        Shrunk 12 time(s)
        Counter example:

        [ 1000, 1010 ]"
    `)
})

test('random sample', () => {
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
          714,
          76,
          214,
          619,
          98,
          628,
          451,
          67,
          503,
          104,
        ]
    `)
})
