import { applicative } from './index.js'

import { collect } from '../../array/index.js'
import { range } from '../../generator/index.js'
import { allEqual, take } from '../../iterator/index.js'
import { array, forAll, unknown } from '../../random/index.js'
import { constant } from '../../random/types/helper/helper.js'
import { integer } from '../../random/types/integer/integer.js'
import { tuple } from '../../random/types/tuple/tuple.js'

import { expect, it, vi } from 'vitest'

it('make reentrant', () => {
    const xs = range(1, 5)
    expect(collect(xs)).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
    expect(collect(xs)).toMatchInlineSnapshot('[]')

    const axs = applicative(range(1, 5))
    expect(collect(axs)).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
    expect(collect(axs)).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
})

it('make reentrant - lazy', () => {
    const fn = vi.fn()
    function* gen() {
        for (const x of range(5)) {
            fn()
            yield x
        }
    }
    const axs = applicative(gen())

    expect(collect(take(axs, 0))).toEqual([])
    expect(fn).not.toHaveBeenCalled()

    const take2 = collect(take(axs, 2))
    expect(fn).toHaveBeenCalledTimes(2)
    expect(collect(take(axs, 2))).toEqual(take2)
    expect(fn).toHaveBeenCalledTimes(2)

    expect(collect(take(axs, 3))).toMatchInlineSnapshot(`
        [
          0,
          1,
          2,
        ]
    `)
    expect(fn).toHaveBeenCalledTimes(3)

    expect(collect(axs)).toMatchInlineSnapshot(`
        [
          0,
          1,
          2,
          3,
          4,
        ]
    `)
    expect(fn).toHaveBeenCalledTimes(5)
})

it('identity', () => {
    forAll(array(unknown()), (xs) => allEqual(applicative(xs), xs))
})

it('should be applicative', () => {
    forAll(
        array(integer()).chain((xs) =>
            tuple(constant(xs), integer({ min: 0, max: xs.length }), integer({ min: 0, max: xs.length })),
        ),
        ([xs, n, m]) => {
            let i = 0
            const ys = applicative(function* () {
                yield* xs
            })

            const ns: number[] = []
            for (const x of ys) {
                if (i++ >= n) {
                    break
                }
                ns.push(x)
            }
            expect(ns).toEqual(xs.slice(0, n))

            let j = 0
            const ms: number[] = []
            for (const x of ys) {
                if (j++ >= m) {
                    break
                }
                ms.push(x)
            }
            expect(ms).toEqual(xs.slice(0, m))

            expect(collect(ys)).toEqual(xs)
        },
    )
})
