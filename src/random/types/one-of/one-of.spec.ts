import { oneOf, oneOfWeighted } from './one-of.js'

import { groupBy, replicate } from '../../../iterator/index.js'
import { mapValues } from '../../../object/index.js'
import { arbitraryContext, xoroshiro128plus } from '../../../random/index.js'
import { integer } from '../integer/integer.js'

import { expect, it, describe } from 'vitest'

describe('oneOf', () => {
    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        const arb = oneOf(
            integer({ min: 0, max: 10 }),
            integer({ min: 10, max: 20 }),
            integer({ min: 20, max: 30 }),
            integer({ min: 30, max: 40 }),
            integer({ min: 40, max: 50 }),
            integer({ min: 50, max: 60 }),
            integer({ min: 60, max: 70 }),
            integer({ min: 70, max: 80 }),
            integer({ min: 80, max: 90 }),
            integer({ min: 90, max: 100 })
        )

        expect(
            mapValues(
                groupBy(
                    replicate(() => arb.sample(context), 10000),
                    (x) => Math.floor(x / 10)
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 991,
            "1": 1008,
            "2": 1043,
            "3": 1001,
            "4": 1023,
            "5": 988,
            "6": 1003,
            "7": 998,
            "8": 971,
            "9": 974,
          }
        `)
    })
})

describe('oneOfWeighted', () => {
    it('distribution', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        const arb = oneOfWeighted(
            [1, integer({ min: 0, max: 10 })],
            [1, integer({ min: 10, max: 20 })],
            [1, integer({ min: 20, max: 30 })],
            [1, integer({ min: 30, max: 40 })],
            [1, integer({ min: 40, max: 50 })],
            [1, integer({ min: 50, max: 60 })],
            [1, integer({ min: 60, max: 70 })],
            [1, integer({ min: 70, max: 80 })],
            [1, integer({ min: 80, max: 90 })],
            [1, integer({ min: 90, max: 100 })]
        )

        expect(
            mapValues(
                groupBy(
                    replicate(() => arb.sample(context), 10000),
                    (x) => Math.floor(x / 10)
                ),

                (v) => v.length
            )
        ).toMatchInlineSnapshot(`
          {
            "0": 991,
            "1": 1008,
            "2": 1043,
            "3": 1001,
            "4": 1023,
            "5": 988,
            "6": 1003,
            "7": 998,
            "8": 971,
            "9": 974,
          }
        `)
    })
})
