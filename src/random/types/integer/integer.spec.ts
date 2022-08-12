import { integer } from '.'

import { tuple, natural } from '..'
import { collect } from '../../../array'
import { repeat } from '../../../generator'
import { groupBy, replicate, take } from '../../../iterator'
import { mapValues } from '../../../object'
import { makeContext, forAll } from '../../../random/arbitrary'
import { xoroshiro128plus } from '../../../random/rng'

test('distribution', () => {
    const context = makeContext({
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
        Object {
          "-1": 39,
          "-2": 48,
          "-3": 44,
          "-4": 48,
          "-5": 44,
          "-6": 60,
          "-7": 48,
          "-8": 47,
          "-9": 54,
          "0": 114,
          "1": 44,
          "2": 42,
          "3": 54,
          "4": 58,
          "5": 55,
          "6": 42,
          "7": 55,
          "8": 49,
          "9": 55,
        }
    `)
})

test('counter example - positive', () => {
    expect(() => forAll(integer(), (v) => v > 0, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 2 tests (seed: 42n)
        Shrunk 1 time(s)
        Counter example:

        0"
    `)
})

test('counter example - negative', () => {
    expect(() => forAll(integer(), (v) => v <= 0, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 1 tests (seed: 42n)
        Shrunk 3 time(s)
        Counter example:

        1"
    `)
})

test('counter example - equal', () => {
    expect(() => forAll(integer(), (v) => v !== 0, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 87 tests (seed: 42n)
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
    const aint = integer({ min: 0, max: 1000 })
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10
            )
        )
    ).toMatchInlineSnapshot(`
        Array [
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
