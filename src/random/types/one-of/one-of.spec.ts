import { oneOf, oneOfWeighted } from './one-of.js'

import { showTree } from '../../../algorithm/tree/tree.js'
import { groupBy, replicate } from '../../../iterator/index.js'
import { mapValues } from '../../../object/index.js'
import { arbitraryContext, xoroshiro128plus } from '../../../random/index.js'
import { boolean } from '../boolean/boolean.js'
import { integer } from '../integer/integer.js'
import { tuple } from '../tuple/tuple.js'

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

    it('show small tree', () => {
        const ctx = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })
        const arb = tuple(oneOf(boolean(), boolean()), oneOf(integer({ min: -10, max: 0 }), integer({ min: 0, max: 10 })))
        const tree1 = arb.value(ctx)
        expect(showTree(tree1, { maxDepth: 2 })).toMatchInlineSnapshot(
            `
          "└─ true,-8
              ├─ false,0
              ├─ false,-8
              |   ├─ false,0
              |   ├─ false,-4
              |   |   └─...
              |   |   └─...
              |   ├─ false,-6
              |   |   └─...
              |   └─ false,-7
              ├─ true,0
              |   └─ false,0
              ├─ true,-4
              |   ├─ false,-2
              |   |   └─...
              |   ├─ false,-4
              |   |   └─...
              |   |   └─...
              |   ├─ true,-2
              |   |   └─...
              |   |   └─...
              |   |   └─...
              |   └─ true,-3
              |       └─...
              ├─ true,-6
              |   ├─ false,-5
              |   ├─ false,-6
              |   |   └─...
              |   └─ true,-5
              |       └─...
              └─ true,-7
                  └─ false,-7"
        `
        )
        const tree2 = arb.value(ctx)
        expect(showTree(tree2, { maxDepth: 2 })).toMatchInlineSnapshot(`
          "└─ true,-5
              ├─ false,0
              ├─ false,-5
              |   ├─ false,0
              |   ├─ false,-3
              |   |   └─...
              |   └─ false,-4
              ├─ true,0
              |   └─ false,0
              ├─ true,-3
              |   ├─ false,-2
              |   |   └─...
              |   ├─ false,-3
              |   |   └─...
              |   └─ true,-2
              |       └─...
              |       └─...
              |       └─...
              └─ true,-4
                  └─ false,-4"
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

    it('show small tree', () => {
        const ctx = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })
        const arb = tuple(
            oneOfWeighted([1, boolean()], [1, boolean()]),
            oneOfWeighted([1, integer({ min: -10, max: 0 })], [1, integer({ min: 0, max: 10 })])
        )
        const tree1 = arb.value(ctx)
        expect(showTree(tree1, { maxDepth: 2 })).toMatchInlineSnapshot(
            `
          "└─ true,-8
              ├─ false,0
              ├─ false,-8
              |   ├─ false,0
              |   ├─ false,-4
              |   |   └─...
              |   |   └─...
              |   ├─ false,-6
              |   |   └─...
              |   └─ false,-7
              ├─ true,0
              |   └─ false,0
              ├─ true,-4
              |   ├─ false,-2
              |   |   └─...
              |   ├─ false,-4
              |   |   └─...
              |   |   └─...
              |   ├─ true,-2
              |   |   └─...
              |   |   └─...
              |   |   └─...
              |   └─ true,-3
              |       └─...
              ├─ true,-6
              |   ├─ false,-5
              |   ├─ false,-6
              |   |   └─...
              |   └─ true,-5
              |       └─...
              └─ true,-7
                  └─ false,-7"
        `
        )
        const tree2 = arb.value(ctx)
        expect(showTree(tree2, { maxDepth: 2 })).toMatchInlineSnapshot(`
          "└─ true,-5
              ├─ false,0
              ├─ false,-5
              |   ├─ false,0
              |   ├─ false,-3
              |   |   └─...
              |   └─ false,-4
              ├─ true,0
              |   └─ false,0
              ├─ true,-3
              |   ├─ false,-2
              |   |   └─...
              |   ├─ false,-3
              |   |   └─...
              |   └─ true,-2
              |       └─...
              |       └─...
              |       └─...
              └─ true,-4
                  └─ false,-4"
        `)
    })
})
