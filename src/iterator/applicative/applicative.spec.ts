import { array, forAll, unknown } from '../../random/index.js'
import { constant } from '../../random/types/helper/helper.js'
import { integer } from '../../random/types/integer/integer.js'
import { tuple } from '../../random/types/tuple/tuple.js'
import { applicative } from './index.js'

import { expect, it, vi } from 'vitest'

it('make reentrant', () => {
    const xs = [1, 2, 3, 4].values()
    expect(xs.toArray()).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
    expect(xs.toArray()).toMatchInlineSnapshot('[]')

    const axs = applicative(() => [1, 2, 3, 4].values())
    expect(Iterator.from(axs).toArray()).toMatchInlineSnapshot(`
        [
          1,
          2,
          3,
          4,
        ]
    `)
    expect(Iterator.from(axs).toArray()).toMatchInlineSnapshot(`
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
        for (const x of [0, 1, 2, 3, 4]) {
            fn()
            yield x
        }
    }
    const axs = applicative(gen)

    // Take 0
    const iter0 = Iterator.from(axs).take(0)
    expect([iter0.next().value]).toEqual([undefined])
    expect(fn).not.toHaveBeenCalled()

    // Take 2
    const iter2 = Iterator.from(axs).take(2)
    expect([iter2.next().value, iter2.next().value, iter2.next().value]).toEqual([0, 1, undefined])
    expect(fn).toHaveBeenCalledTimes(2)

    // Take 3
    const iter3 = Iterator.from(axs).take(3)
    expect([iter3.next().value, iter3.next().value, iter3.next().value, iter3.next().value]).toEqual([0, 1, 2, undefined])
    expect(fn).toHaveBeenCalledTimes(5)

    // Take all
    const iterAll = Iterator.from(axs)
    expect([
        iterAll.next().value,
        iterAll.next().value,
        iterAll.next().value,
        iterAll.next().value,
        iterAll.next().value,
        iterAll.next().value,
    ]).toEqual([0, 1, 2, 3, 4, undefined])
    expect(fn).toHaveBeenCalledTimes(10)
    expect(Iterator.from(axs).toArray()).toEqual([0, 1, 2, 3, 4])
    expect(fn).toHaveBeenCalledTimes(15)
})

it('identity', () => {
    forAll(array(unknown()), (xs) => {
        expect(Iterator.from(applicative(() => xs)).toArray()).toEqual(xs)
    })
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

            expect(Iterator.from(ys).toArray()).toEqual(xs)
        },
    )
})
