import { array } from './array.js'

import { bfs } from '../../../algorithm/tree/tree.js'
import { isArray, isInteger } from '../../../guard/index.js'
import { all } from '../../../iterator/index.js'
import { forAll } from '../../arbitrary/index.js'
import { constant } from '../helper/helper.js'
import { natural } from '../index.js'
import { integer } from '../integer/index.js'
import { tuple } from '../tuple/tuple.js'

import { describe, expect, it } from 'vitest'
import { arbitraryContext } from '../../arbitrary/context/context.js'

describe('array', () => {
    it('simple', () => {
        forAll(array(integer()), (xs) => {
            return isArray(xs) && all(xs, isInteger)
        })
    })

    it('length is parametrized', () => {
        forAll(
            tuple(integer({ min: 0, max: 10 }), integer({ min: 0, max: 10 })).chain(([a, b]) => {
                const minLength = a
                const maxLength = a + b
                return array(integer(), { minLength, maxLength }).map((xs) => [xs, minLength, maxLength] as const)
            }),
            // inclusive
            ([xs, minLength, maxLength]) => minLength <= xs.length && xs.length <= maxLength,
        )
    })

    it('check min constraint', () => {
        forAll(
            natural({ max: 1000 }).chain((min) => {
                return tuple(constant(min), array(integer(), { minLength: min }))
            }),
            ([min, xs]) => xs.length >= min,
            { seed: 42n },
        )
    })

    it('check max constraint', () => {
        forAll(
            natural({ min: 1, max: 1000 }).chain((max) => {
                return tuple(constant(max), array(integer(), { maxLength: max }))
            }),
            ([max, xs]) => xs.length <= max,
            { seed: 42n },
        )
    })

    it.skip('check min constraint - shrinking', () => {
        forAll(
            natural({ max: 1000 })
                .map(() => 2)
                .chain((min) => {
                    const arr = array(integer(), { minLength: min })
                    return tuple(constant(min), constant(arr))
                }),
            ([min, arr], ctx) => {
                let i = 0
                for (const v of bfs(arr.value(ctx))) {
                    if (v.length < min) {
                        return false
                    }
                    i += 1
                    if (i > 10000) {
                        return false
                    }
                }
                return true
            },
            { seed: 42n, tests: 1 },
        )
    })

    it.skip('check max constraint - shrinking', () => {
        forAll(
            natural({ min: 1, max: 1000 }).chain((max) => {
                const arr = array(integer(), { maxLength: max })
                return tuple(constant(max), constant(arr))
            }),
            ([max, arr], ctx) => {
                for (const v of bfs(arr.value(ctx))) {
                    if (v.length >= max) {
                        return false
                    }
                }
                return true
            },
            { seed: 42n },
        )
    })

    it('cardinality', () => {
        expect(array(integer()).supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('42949672970')
    })
})
