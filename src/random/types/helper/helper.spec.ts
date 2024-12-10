import { showTree } from '../../../algorithm/tree/tree.js'
import { mapValues } from '../../../object/map-values/map-values.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/xoroshiro128plus/xoroshiro128plus.js'
import { boolean } from '../boolean/boolean.js'
import { integer } from '../integer/integer.js'
import { optional } from './helper.js'

import { expect, it } from 'vitest'

it('distribution', () => {
    const context = arbitraryContext({
        rng: xoroshiro128plus(42n),
    })
    expect(
        mapValues(
            Object.groupBy(
                Array.from({ length: 1000 }, () => optional(boolean()).sample(context)),
                (x) => x.toString(),
            ),
            (v) => v?.length,
        ),
    ).toMatchInlineSnapshot(`
      {
        "Symbol((Nothing))": 639,
        "false": 188,
        "true": 173,
      }
    `)
})

it('allows shrinking to undefined', () => {
    const context = arbitraryContext({
        rng: xoroshiro128plus(45n),
    })
    expect(showTree(optional(integer({ min: 0, max: 10 })).value(context), { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ Symbol((Nothing))
          ├─ Symbol((Nothing))
          └─ 10
              ├─ 0
              ├─ 5
              |   ├─ 3
              |   |   └─ 2
              |   |       └─ 1
              |   └─ 4
              ├─ 8
              |   └─ 7
              |       └─ 6
              └─ 9"
    `,
    )
    expect(showTree(optional(integer({ min: 0, max: 10 })).value(context), { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ 5
          ├─ Symbol((Nothing))
          ├─ 0
          ├─ 3
          |   └─ 2
          |       └─ 1
          └─ 4"
    `,
    )
    expect(showTree(optional(integer({ min: 0, max: 10 })).value(context), { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ Symbol((Nothing))
          └─ Symbol((Nothing))"
    `,
    )
    expect(showTree(optional(integer({ min: 0, max: 10 })).value(context), { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ Symbol((Nothing))
          ├─ Symbol((Nothing))
          └─ 10
              ├─ 0
              ├─ 5
              |   ├─ 3
              |   |   └─ 2
              |   |       └─ 1
              |   └─ 4
              ├─ 8
              |   └─ 7
              |       └─ 6
              └─ 9"
    `,
    )
    expect(showTree(optional(integer({ min: 0, max: 10 })).value(context), { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ Symbol((Nothing))
          └─ Symbol((Nothing))"
    `,
    )
    expect(showTree(optional(integer({ min: 0, max: 10 })).value(context), { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ Symbol((Nothing))
          ├─ Symbol((Nothing))
          └─ 8
              ├─ 0
              ├─ 4
              |   ├─ 2
              |   |   └─ 1
              |   └─ 3
              ├─ 6
              |   └─ 5
              └─ 7"
    `,
    )
    expect(showTree(optional(integer({ min: 0, max: 10 })).value(context), { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ 2
          ├─ Symbol((Nothing))
          ├─ 0
          └─ 1"
    `,
    )
    expect(showTree(optional(integer({ min: 0, max: 10 })).value(context), { maxDepth: 6 })).toMatchInlineSnapshot(
        `
      "└─ 9
          ├─ Symbol((Nothing))
          ├─ 0
          ├─ 5
          |   ├─ 3
          |   |   └─ 2
          |   |       └─ 1
          |   └─ 4
          ├─ 7
          |   └─ 6
          └─ 8"
    `,
    )
})
