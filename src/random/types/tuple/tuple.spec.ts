import { tuple } from './tuple.js'

import { showTree } from '../../../algorithm/tree/tree.js'
import { collect } from '../../../array/collect/collect.js'
import { repeat } from '../../../generator/_deprecated/repeat/repeat.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { boolean } from '../boolean/boolean.js'
import { integer } from '../integer/index.js'

import { expect, it } from 'vitest'

it('counter example - equal', () => {
    expect(() => {
        forAll(tuple(integer(), integer()), ([a, b]) => a !== b, { seed: 42n, tests: 1000, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 493 tests (seed: 42n)
      Shrunk 1 time(s)
      Counter example:

      [ 0, 0 ]

      ]
    `)
})

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = tuple(integer(), integer())
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
          218084956,
          -987316205,
        ],
        [
          -123414345,
          -1991294022,
        ],
        [
          1312757735,
          -1984378058,
        ],
        [
          -1806577501,
          -468159076,
        ],
        [
          -1373641556,
          -1507935664,
        ],
        [
          -998293443,
          1013760583,
        ],
        [
          -1620441934,
          2070318678,
        ],
        [
          -1565533012,
          813063013,
        ],
        [
          -87348706,
          668940130,
        ],
        [
          1623133978,
          1890748742,
        ],
      ]
    `)
})

it('show small tree', () => {
    const ctx = arbitraryContext({
        rng: xoroshiro128plus(42n),
    })
    const arb = tuple(boolean(), integer({ min: 0, max: 10 }))
    const tree1 = arb.value(ctx)
    expect(showTree(tree1, { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ true,0
          ├─ false,0
          ├─ false,0
          |   └─ false,0
          └─ true,0
              └─ false,0"
    `,
    )
    const tree2 = arb.value(ctx)
    expect(showTree(tree2, { maxDepth: 6 })).toMatchInlineSnapshot(`
      "└─ true,2
          ├─ false,0
          ├─ false,2
          |   ├─ false,0
          |   └─ false,1
          ├─ true,0
          |   └─ false,0
          └─ true,1
              └─ false,1"
    `)
})

it('show small tree - integers', () => {
    const ctx = arbitraryContext({
        rng: xoroshiro128plus(56n),
    })
    const arb = tuple(integer({ min: 0, max: 17 }), integer({ min: 0, max: 17 }))
    const tree1 = arb.value(ctx)
    expect(showTree(tree1, { maxDepth: 2 })).toMatchSnapshot()
})

it('cardinality', () => {
    expect(tuple(integer(), integer()).supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('18446744082299486000')
})
