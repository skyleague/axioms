import { set, subsuper } from './set.js'

import { collect } from '../../../array/collect/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { unique } from '../../../iterator/unique/index.js'
import { difference } from '../../../set/difference/index.js'
import { isSuperset } from '../../../set/is-superset/is-super.js'
import { forAll } from '../../arbitrary/forall/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { unknown } from '../complex/index.js'
import { integer } from '../integer/index.js'

import { expect, describe, it } from 'vitest'

describe('set', () => {
    it('all unique - number', () => {
        const size = 1000
        forAll(set(integer({ min: 0, max: size })), (xs) => xs.length === collect(unique(xs)).length, { seed: 1638968569864n })
    })

    it('always larger than minsize', () => {
        const size = 3
        forAll(set(integer(), { minLength: size, maxLength: 100 }), (xs) => {
            return xs.length >= size
        })
    })
})

it('always larger than minsize', () => {
    const size = 3
    forAll(set(integer(), { minLength: size, maxLength: 100 }), (xs) => {
        return xs.length >= size
    })
})

describe('subsuper', () => {
    it('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = subsuper(integer({ min: 0, max: 100 }))
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              [
                [
                  7,
                  21,
                  61,
                  9,
                  62,
                  45,
                  6,
                ],
                [
                  7,
                  21,
                  61,
                  9,
                  62,
                  45,
                  6,
                  10,
                  2,
                  29,
                  28,
                  84,
                ],
                [
                  10,
                  2,
                  29,
                  28,
                  84,
                ],
              ],
              [
                [
                  37,
                  90,
                  49,
                  62,
                  71,
                  20,
                ],
                [
                  37,
                  90,
                  49,
                  62,
                  71,
                  20,
                  68,
                  29,
                  21,
                ],
                [
                  68,
                  29,
                  21,
                ],
              ],
              [
                [
                  87,
                  62,
                  78,
                  37,
                  75,
                ],
                [
                  87,
                  62,
                  78,
                  37,
                  75,
                  65,
                  99,
                  89,
                  64,
                  61,
                  7,
                  20,
                ],
                [
                  65,
                  99,
                  89,
                  64,
                  61,
                  7,
                  20,
                ],
              ],
              [
                [
                  36,
                  19,
                  48,
                  55,
                  96,
                  97,
                  54,
                  3,
                  13,
                ],
                [
                  36,
                  19,
                  48,
                  55,
                  96,
                  97,
                  54,
                  3,
                  13,
                  67,
                  21,
                ],
                [
                  67,
                  21,
                ],
              ],
              [
                [
                  77,
                  6,
                  16,
                  13,
                  52,
                  51,
                  90,
                ],
                [
                  77,
                  6,
                  16,
                  13,
                  52,
                  51,
                  90,
                  55,
                  12,
                  61,
                ],
                [
                  55,
                  12,
                  61,
                ],
              ],
              [
                [
                  49,
                ],
                [
                  49,
                  75,
                  69,
                  36,
                  62,
                  29,
                ],
                [
                  75,
                  69,
                  36,
                  62,
                  29,
                ],
              ],
              [
                [
                  43,
                  14,
                  11,
                  3,
                  27,
                  55,
                ],
                [
                  43,
                  14,
                  11,
                  3,
                  27,
                  55,
                  32,
                ],
                [
                  32,
                ],
              ],
              [
                [],
                [
                  56,
                  50,
                  6,
                  84,
                  8,
                  81,
                ],
                [
                  56,
                  50,
                  6,
                  84,
                  8,
                  81,
                ],
              ],
              [
                [],
                [],
                [],
              ],
              [
                [
                  5,
                  14,
                  28,
                  84,
                  92,
                  43,
                ],
                [
                  5,
                  14,
                  28,
                  84,
                  92,
                  43,
                  77,
                  66,
                  64,
                  37,
                  98,
                  11,
                  58,
                  26,
                ],
                [
                  77,
                  66,
                  64,
                  37,
                  98,
                  11,
                  58,
                  26,
                ],
              ],
            ]
        `)
    })

    it('S U X, S C X', () => {
        forAll(subsuper(unknown()), ([sub, superset]) => isSuperset(superset, sub))
    })

    it('S U X, ~ X C S \\ X', () => {
        forAll(subsuper(unknown()), ([sub, superset]) => {
            const complement = [...difference(superset, sub)]
            return complement.length === 0 || !isSuperset(sub, complement)
        })
    })
})
