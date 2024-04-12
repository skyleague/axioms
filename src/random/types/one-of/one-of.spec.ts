import { oneOf, oneOfWeighted } from './one-of.js'

import { showTree } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/collect/collect.js'
import { repeat } from '../../../generator/repeat/repeat.js'
import { groupBy, replicate } from '../../../iterator/index.js'
import { take } from '../../../iterator/take/take.js'
import { mapValues } from '../../../object/index.js'
import { arbitraryContext, xoroshiro128plus } from '../../../random/index.js'
import type { Dependent } from '../../arbitrary/dependent/dependent.js'
import { array } from '../array/array.js'
import { boolean } from '../boolean/boolean.js'
import { constant, memoizeArbitrary } from '../helper/helper.js'
import { integer } from '../integer/integer.js'
import { object } from '../object/object.js'
import { string } from '../string/string.js'
import { tuple } from '../tuple/tuple.js'

import { describe, expect, expectTypeOf, it } from 'vitest'

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
            integer({ min: 90, max: 100 }),
        )

        expect(
            mapValues(
                groupBy(
                    replicate(() => arb.sample(context), 10000),
                    (x) => Math.floor(x / 10),
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 886,
            "1": 1042,
            "10": 75,
            "2": 1009,
            "3": 1019,
            "4": 1021,
            "5": 990,
            "6": 1003,
            "7": 991,
            "8": 965,
            "9": 999,
          }
        `)
    })

    it('distribution - small', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })

        const arb = oneOf(constant(1), constant(2), constant(3))

        expect(
            mapValues(
                groupBy(
                    replicate(() => arb.sample(context), 10000),
                    (x) => x,
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "1": 3283,
            "2": 3398,
            "3": 3319,
          }
        `)
    })

    it('distribution - depth', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(43n),
        })

        const arb: Dependent<unknown> = oneOf(boolean(), object({ nested: memoizeArbitrary(() => arb) }))

        expect(
            mapValues(
                groupBy(
                    replicate(() => arb.sample(context), 100),
                    (x) => JSON.stringify(x),
                ),
                (g) => g.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "false": 32,
            "true": 26,
            "{"nested":false}": 19,
            "{"nested":true}": 11,
            "{"nested":{"nested":false}}": 5,
            "{"nested":{"nested":true}}": 2,
            "{"nested":{"nested":{"nested":false}}}": 3,
            "{"nested":{"nested":{"nested":true}}}": 2,
          }
        `)
    })

    it('distribution - depth l', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(43n),
            depth: 'l',
        })

        const arb: Dependent<unknown> = oneOf(boolean(), object({ nested: memoizeArbitrary(() => arb) }))

        expect(
            mapValues(
                groupBy(
                    replicate(() => arb.sample(context), 100),
                    (x) => JSON.stringify(x),
                ),
                (g) => g.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "false": 27,
            "true": 28,
            "{"nested":false}": 11,
            "{"nested":true}": 6,
            "{"nested":{"nested":false}}": 5,
            "{"nested":{"nested":true}}": 5,
            "{"nested":{"nested":{"nested":false}}}": 5,
            "{"nested":{"nested":{"nested":true}}}": 4,
            "{"nested":{"nested":{"nested":{"nested":false}}}}": 2,
            "{"nested":{"nested":{"nested":{"nested":true}}}}": 1,
            "{"nested":{"nested":{"nested":{"nested":{"nested":false}}}}}": 3,
            "{"nested":{"nested":{"nested":{"nested":{"nested":true}}}}}": 2,
            "{"nested":{"nested":{"nested":{"nested":{"nested":{"nested":false}}}}}}": 1,
          }
        `)
    })

    it('distribution - depth xl', () => {
        const context = arbitraryContext({
            rng: xoroshiro128plus(43n),
            depth: 'xl',
        })

        const arb: Dependent<unknown> = oneOf(boolean(), object({ nested: memoizeArbitrary(() => arb) }))

        expect(
            mapValues(
                groupBy(
                    replicate(() => arb.sample(context), 100),
                    (x) => JSON.stringify(x),
                ),
                (g) => g.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "false": 27,
            "true": 28,
            "{"nested":false}": 11,
            "{"nested":true}": 6,
            "{"nested":{"nested":false}}": 5,
            "{"nested":{"nested":true}}": 5,
            "{"nested":{"nested":{"nested":false}}}": 5,
            "{"nested":{"nested":{"nested":true}}}": 4,
            "{"nested":{"nested":{"nested":{"nested":false}}}}": 2,
            "{"nested":{"nested":{"nested":{"nested":true}}}}": 1,
            "{"nested":{"nested":{"nested":{"nested":{"nested":false}}}}}": 3,
            "{"nested":{"nested":{"nested":{"nested":{"nested":true}}}}}": 2,
            "{"nested":{"nested":{"nested":{"nested":{"nested":{"nested":false}}}}}}": 1,
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
        `,
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

    it('handles complicated recursive structures', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), depth: 'xs' })
        const size = 'xs'

        const booleanInstance = boolean()
        const schema: Dependent<unknown> = oneOf(
            memoizeArbitrary(() => booleanInstance),
            array(string({ size }), { size }).chain((dictKeys) =>
                object(Object.fromEntries([...dictKeys.map((k) => [k, memoizeArbitrary(() => schema)])])),
            ),
        )
        expect(
            collect(
                take(
                    repeat(() => schema.sample(ctx)),
                    100,
                ),
            ),
        ).toMatchInlineSnapshot(`
          [
            true,
            true,
            {},
            true,
            true,
            false,
            false,
            false,
            false,
            {
              "I": true,
            },
            true,
            false,
            false,
            {},
            false,
            false,
            true,
            true,
            true,
            false,
            false,
            false,
            true,
            false,
            true,
            false,
            true,
            {
              "c": {
                "": false,
              },
            },
            true,
            {},
            true,
            {
              "": false,
            },
            true,
            false,
            false,
            {
              "": false,
            },
            {},
            false,
            {
              "i": false,
            },
            false,
            false,
            true,
            true,
            false,
            false,
            true,
            {
              "": {
                "d": false,
              },
            },
            {},
            false,
            true,
            false,
            false,
            {},
            true,
            true,
            {
              "v": true,
            },
            {},
            false,
            true,
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            {},
            false,
            true,
            {
              "": false,
            },
            true,
            true,
            false,
            true,
            false,
            true,
            true,
            {},
            true,
            false,
            false,
            false,
            true,
            false,
            false,
            {
              "": {},
            },
            true,
            true,
            true,
            {
              "": true,
            },
            false,
            true,
            false,
            true,
            false,
            {
              "Q": true,
            },
            false,
            true,
            false,
            true,
          ]
        `)
    })

    it('types correctly', () => {
        expectTypeOf(oneOf(integer(), string())).toEqualTypeOf<Dependent<number | string>>()
        expectTypeOf(oneOf(constant('foo'), constant('bar'))).toEqualTypeOf<Dependent<'foo' | 'bar'>>()
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
            [1, integer({ min: 90, max: 100 })],
        )

        expect(
            mapValues(
                groupBy(
                    replicate(() => arb.sample(context), 10000),
                    (x) => Math.floor(x / 10),
                ),

                (v) => v.length,
            ),
        ).toMatchInlineSnapshot(`
          {
            "0": 886,
            "1": 1042,
            "10": 75,
            "2": 1009,
            "3": 1019,
            "4": 1021,
            "5": 990,
            "6": 1003,
            "7": 991,
            "8": 965,
            "9": 999,
          }
        `)
    })

    it('show small tree', () => {
        const ctx = arbitraryContext({
            rng: xoroshiro128plus(42n),
        })
        const arb = tuple(
            oneOfWeighted([1, boolean()], [1, boolean()]),
            oneOfWeighted([1, integer({ min: -10, max: 0 })], [1, integer({ min: 0, max: 10 })]),
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
        `,
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
