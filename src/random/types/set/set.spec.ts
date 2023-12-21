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
                27,
                47,
                3,
                80,
                7,
              ],
              [
                27,
                47,
                3,
                80,
                7,
                18,
                14,
                26,
              ],
              [
                18,
                14,
                26,
              ],
            ],
            [
              [
                12,
                98,
                13,
                68,
                47,
                65,
                87,
              ],
              [
                12,
                98,
                13,
                68,
                47,
                65,
                87,
                96,
                43,
                55,
                45,
                33,
                18,
                72,
                74,
                25,
              ],
              [
                96,
                43,
                55,
                45,
                33,
                18,
                72,
                74,
                25,
              ],
            ],
            [
              [
                92,
                33,
                45,
                83,
                19,
                91,
                37,
                38,
                15,
              ],
              [
                92,
                33,
                45,
                83,
                19,
                91,
                37,
                38,
                15,
                52,
                22,
              ],
              [
                52,
                22,
              ],
            ],
            [
              [
                79,
                48,
                76,
                37,
                94,
                65,
              ],
              [
                79,
                48,
                76,
                37,
                94,
                65,
                9,
                56,
                7,
              ],
              [
                9,
                56,
                7,
              ],
            ],
            [
              [],
              [
                53,
                46,
                12,
                98,
                70,
                67,
              ],
              [
                53,
                46,
                12,
                98,
                70,
                67,
              ],
            ],
            [
              [
                91,
                61,
                38,
                59,
                96,
                55,
                26,
              ],
              [
                91,
                61,
                38,
                59,
                96,
                55,
                26,
                1,
                31,
                93,
                3,
                15,
                54,
                42,
              ],
              [
                1,
                31,
                93,
                3,
                15,
                54,
                42,
              ],
            ],
            [
              [
                53,
                97,
                46,
                91,
              ],
              [
                53,
                97,
                46,
                91,
                69,
                9,
                81,
                62,
                92,
                24,
                40,
                78,
              ],
              [
                69,
                9,
                81,
                62,
                92,
                24,
                40,
                78,
              ],
            ],
            [
              [
                70,
                64,
                77,
                4,
                67,
                44,
                87,
                42,
                58,
              ],
              [
                70,
                64,
                77,
                4,
                67,
                44,
                87,
                42,
                58,
                37,
                54,
                49,
              ],
              [
                37,
                54,
                49,
              ],
            ],
            [
              [],
              [
                3,
                66,
                18,
                34,
                82,
              ],
              [
                3,
                66,
                18,
                34,
                82,
              ],
            ],
            [
              [
                12,
                89,
                90,
                72,
                6,
                55,
                87,
                41,
                5,
              ],
              [
                12,
                89,
                90,
                72,
                6,
                55,
                87,
                41,
                5,
                13,
                38,
                63,
                23,
                74,
              ],
              [
                13,
                38,
                63,
                23,
                74,
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
