import { collect } from '../../src/array/index.js'
import { equal, replicate } from '../../src/iterator/index.js'
import { array, integer, forAll, tuple, natural, constant } from '../../src/random/index.js'

import { expect, it } from 'vitest'

// https://github.com/jlink/shrinking-challenge
it('bound 5', () => {
    const sum16 = (a: number, b: number) => {
        let s = a + b
        while (s > 32767) s -= 65536
        while (s < -32768) s += 65536
        return s
    }

    const boundedList = array(integer({ min: -32768, max: 32767 })).filter((x) => x.reduce(sum16, 0) < 256)
    expect(() => {
        forAll(
            tuple(boundedList, boundedList, boundedList, boundedList, boundedList),
            (xs) => xs.flat().reduce(sum16, 0) < 5 * 256,
            { seed: 42n, timeout: false, tests: 1000 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 745 tests (seed: 42n)
      Shrunk 2 time(s)
      Counter example:

      [ [ -32762 ], [], [], [ -7 ], [] ]]
    `)
})

it('coupling', () => {
    expect(() => {
        forAll(
            array(natural({ max: 10 })).filter((xs) => xs.every((v) => v < xs.length)),
            (xs) => {
                for (let i = 0; i !== xs.length; ++i) {
                    const j = xs[i]!
                    // eslint-disable-next-line @typescript-eslint/no-confusing-non-null-assertion
                    if (i !== j && xs[j]! === i) {
                        return false
                    }
                }
                return true
            },
            { seed: 42n, timeout: false, tests: 1000 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 43 tests (seed: 42n)
      Shrunk 12 time(s)
      Counter example:

      [ 1, 0 ]]
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
            { seed: 42n, timeout: false, tests: 1000 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 81 tests (seed: 42n)
      Shrunk 12 time(s)
      Counter example:

      [ [ 0, 0 ], 0 ]]
    `)
})

it('difference 1', () => {
    expect(() => {
        forAll(
            tuple(natural(), natural()),
            ([x, y]) => {
                return x < 10 || x !== y
            },
            { seed: 42n, timeout: false, tests: 400 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 304 tests (seed: 42n)
      Shrunk 29 time(s)
      Counter example:

      [ 10, 10 ]]
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
            { seed: 42n, timeout: false, tests: 100 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 28 tests (seed: 42n)
      Shrunk 5 time(s)
      Counter example:

      [ 10, 6 ]]
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

            { seed: 42n, timeout: false, tests: 200 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 115 tests (seed: 42n)
      Shrunk 0 time(s)
      Counter example:

      [ 10, 9 ]]
    `)
})

it('distinct', () => {
    expect(() => {
        forAll(
            array(integer()),
            (xs) => {
                return new Set(xs).size < 3
            },
            { seed: 42n, timeout: false, tests: 1000 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 2 tests (seed: 42n)
      Shrunk 63 time(s)
      Counter example:

      [ 0, 1, 2 ]]
    `)
})

it('nested list', () => {
    expect(() => {
        forAll(
            array(array(constant(0))),
            (xs) => {
                return xs.map((l) => l.length).reduce((a, b) => a + b, 0) <= 10
            },
            { seed: 42n, timeout: false, tests: 1000 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
          [FalsifiedError: Counter example found after 2 tests (seed: 42n)
          Shrunk 9 time(s)
          Counter example:

          [ [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ]]
        `)
})

it('length list', () => {
    expect(() => {
        forAll(
            integer({ min: 1, max: 100 }).chain((n) => tuple(...collect(replicate(natural({ max: 1000 }), n)))),
            (xs) => {
                return xs.reduce((a, b) => Math.max(a, b), 0) < 900
            },
            { seed: 42n, timeout: false, tests: 1000 }
        )
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 9 tests (seed: 42n)
      Shrunk 4 time(s)
      Counter example:

      [ 900 ]]
    `)
})

it('large union list', () => {
    expect(() => {
        forAll(array(array(integer())), (xs) => new Set(xs.flat()).size < 5, { seed: 42n, timeout: false, tests: 1000 })
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 17 tests (seed: 42n)
      Shrunk 126 time(s)
      Counter example:

      [ [ 0, 1, 2, 3, 4 ] ]]
    `)
})

it('reverse', () => {
    expect(() => {
        forAll(array(integer()), (xs) => equal(xs, [...xs].reverse()), { seed: 42n, timeout: false, tests: 1000 })
    }).toThrowErrorMatchingInlineSnapshot(`
      [FalsifiedError: Counter example found after 10 tests (seed: 42n)
      Shrunk 32 time(s)
      Counter example:

      [ 0, 1 ]]
    `)
})
