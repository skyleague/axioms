import { array } from './array.js'

import { bfs } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/index.js'
import { isArray, isInteger } from '../../../guard/index.js'
import { all, unique } from '../../../iterator/index.js'
import { forAll } from '../../arbitrary/index.js'
import { constant } from '../helper/helper.js'
import { natural } from '../index.js'
import { integer } from '../integer/index.js'
import { tuple } from '../tuple/tuple.js'

import { describe, it } from 'vitest'

describe('array', () => {
    it('simple', () => {
        forAll(array(integer()), (xs) => {
            return isArray(xs) && all(xs, isInteger)
        })
    })

    it('unique', () => {
        forAll(array(integer(), { uniqueItems: true }), (xs) => {
            return isArray(xs) && all(xs, isInteger) && collect(unique(xs)).length === xs.length
        })
    })

    it('check min constraint', () => {
        forAll(
            natural({ max: 1000 }).chain((min) => {
                return tuple(constant(min), array(integer(), { minLength: min }))
            }),
            ([min, xs]) => xs.length >= min,
            { seed: 42n }
        )
    })

    it('check max constraint', () => {
        forAll(
            natural({ min: 1, max: 1000 }).chain((max) => {
                return tuple(constant(max), array(integer(), { maxLength: max }))
            }),
            ([max, xs]) => xs.length < max,
            { seed: 42n }
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
            { seed: 42n, tests: 1 }
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
            { seed: 42n }
        )
    })
})
