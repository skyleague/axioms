import { replicate } from './index.js'

import { collect, zip } from '../../../array/index.js'
import { range } from '../../../generator/index.js'
import { forAll, natural, tuple, unknown } from '../../../random/index.js'
import { all, foldl } from '../../index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(collect(replicate(1, 2))).toMatchInlineSnapshot(`
        [
          1,
          1,
        ]
    `)
    expect(collect(replicate((i) => i, 2))).toMatchInlineSnapshot(`
        [
          0,
          1,
        ]
    `)
})

it('correct length', () => {
    forAll(
        tuple(natural({ max: 20000 }), unknown()),
        ([n, p]) => {
            const xs = replicate(p, n)
            expect(foldl(xs, (s) => s + 1, 0)).toBe(n)
        },
        { tests: 10 },
    )
})

it('all same primitive', () => {
    forAll(
        tuple(natural({ max: 20000 }), unknown()),
        ([n, p]) => {
            const xs = replicate(p, n)
            return all(xs, (x) => x === p)
        },
        { tests: 10 },
    )
})

it('all same primitive from function', () => {
    forAll(
        tuple(natural({ max: 20000 }), unknown()),
        ([n, p]) => {
            const xs = replicate(() => p, n)
            return all(xs, (x) => x === p)
        },
        { tests: 10 },
    )
})

it('range from function with index', () => {
    forAll(
        natural({ max: 20000 }),
        (n) => {
            all(
                zip(
                    replicate((i) => i, n),
                    range(0, n),
                ),
                ([i, r]) => i === r,
            )
        },
        { tests: 10 },
    )
})

it('spread', () => {
    expect(collect(replicate(() => false, 10))).toMatchInlineSnapshot(`
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ]
    `)
})
