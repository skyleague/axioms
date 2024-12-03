import { set, subsuper } from './set.js'

import { collect } from '../../../array/collect/collect.js'
import { repeat } from '../../../generator/_deprecated/repeat/repeat.js'
import { take } from '../../../iterator/_deprecated/take/take.js'
import { unique } from '../../../iterator/unique/unique.js'
import { difference } from '../../../set/_deprecated/difference/difference.js'
import { isSuperset } from '../../../set/_deprecated/is-superset/is-super.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/forall.js'
import { random } from '../../arbitrary/random/random.js'
import { xoroshiro128plus } from '../../rng/xoroshiro128plus/xoroshiro128plus.js'
import { unknown } from '../complex/complex.js'
import { integer } from '../integer/integer.js'

import { describe, expect, expectTypeOf, it } from 'vitest'
import { constants } from '../constants/constants.js'

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

    it('types are correct', () => {
        expectTypeOf(random(set(integer()))).toEqualTypeOf<number[]>()
        expectTypeOf(random(set(integer(), { minLength: 1 }))).toEqualTypeOf<[number, ...number[]]>()
        expectTypeOf(random(set(integer(), { minLength: 2 }))).toEqualTypeOf<[number, number, ...number[]]>()
        expectTypeOf(random(set(integer(), { minLength: 3 }))).toEqualTypeOf<[number, number, number, ...number[]]>()
        expectTypeOf(random(set(integer(), { minLength: 4 }))).toEqualTypeOf<[number, number, number, number, ...number[]]>()
        expectTypeOf(random(set(integer(), { minLength: 5 }))).toEqualTypeOf<number[]>()
    })

    it('always larger than minsize', () => {
        const size = 3
        forAll(set(integer(), { minLength: size, maxLength: 100 }), (xs) => {
            return xs.length >= size
        })
    })

    it('stops on infeasible', () => {
        expect(() =>
            forAll(set(integer({ min: 1332584308, max: 1332584308 }), { minLength: 2 }), (xs) => {
                return xs.length !== 2 && collect(unique(xs)).length === 2
            }),
        ).toThrowErrorMatchingInlineSnapshot('[Error: The minimum value must be less than the maximum value, and be finite]')
    })

    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = set(integer({ min: 0, max: 1 }))
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
          [
            [
              0,
            ],
            [
              0,
            ],
            [
              0,
              1,
            ],
            [],
            [
              0,
              1,
            ],
            [
              1,
            ],
            [
              1,
              0,
            ],
            [
              0,
            ],
            [
              0,
            ],
            [
              1,
              0,
            ],
          ]
        `)
    }, 10)

    it('cardinality', () => {
        expect(set(constants('foo', 'bar')).supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('undefined')
    })
})

describe('subsuper', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = subsuper(integer({ min: 0, max: 100 }))
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
          [
            [
              [
                27,
                47,
                3,
                81,
                8,
                39,
              ],
              [
                27,
                47,
                3,
                81,
                8,
                39,
                15,
              ],
              [
                15,
              ],
            ],
            [
              [
                74,
                12,
              ],
              [
                74,
                12,
                13,
                69,
                48,
                66,
                88,
                94,
                97,
                44,
                56,
                46,
              ],
              [
                13,
                69,
                48,
                66,
                88,
                94,
                97,
                44,
                56,
                46,
              ],
            ],
            [
              [
                18,
                73,
                75,
              ],
              [
                18,
                73,
                75,
                99,
                93,
              ],
              [
                99,
                93,
              ],
            ],
            [
              [
                46,
                84,
                20,
              ],
              [
                46,
                84,
                20,
                37,
                38,
                15,
                25,
                53,
                22,
                65,
                79,
                48,
                77,
              ],
              [
                37,
                38,
                15,
                25,
                53,
                22,
                65,
                79,
                48,
                77,
              ],
            ],
            [
              [
                95,
                65,
                30,
                9,
              ],
              [
                95,
                65,
                30,
                9,
                8,
                6,
                69,
                53,
                46,
                12,
              ],
              [
                8,
                6,
                69,
                53,
                46,
                12,
              ],
            ],
            [
              [
                71,
                68,
                92,
                62,
                39,
                59,
                97,
                55,
                26,
                83,
              ],
              [
                71,
                68,
                92,
                62,
                39,
                59,
                97,
                55,
                26,
                83,
              ],
              [],
            ],
            [
              [
                1,
                94,
                92,
              ],
              [
                1,
                94,
                92,
              ],
              [],
            ],
            [
              [
                55,
              ],
              [
                55,
                49,
                54,
                98,
                47,
              ],
              [
                49,
                54,
                98,
                47,
              ],
            ],
            [
              [
                88,
                69,
                10,
                81,
                63,
                93,
                25,
                40,
                79,
                92,
              ],
              [
                88,
                69,
                10,
                81,
                63,
                93,
                25,
                40,
                79,
                92,
                65,
                78,
                4,
                67,
                44,
                42,
              ],
              [
                65,
                78,
                4,
                67,
                44,
                42,
              ],
            ],
            [
              [
                30,
                38,
                54,
                49,
                1,
                53,
              ],
              [
                30,
                38,
                54,
                49,
                1,
                53,
              ],
              [],
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
