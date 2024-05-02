import { groupBy, replicate } from '../../../iterator/index.js'
import { mapValues } from '../../../object/index.js'
import { arbitraryContext, boolean, forAll, xoroshiro128plus } from '../../../random/index.js'

import { expect, it } from 'vitest'

it('distribution', () => {
    const context = arbitraryContext({
        rng: xoroshiro128plus(42n),
    })

    expect(
        mapValues(
            groupBy(
                replicate(() => boolean().sample(context), 1000),
                (x) => x.toString(),
            ),

            (v) => v.length,
        ),
    ).toMatchInlineSnapshot(`
      {
        "false": 510,
        "true": 490,
      }
    `)
})

it('counter example - true', () => {
    expect(() => {
        forAll(boolean(), (v) => v, { seed: 42n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 3 tests (seed: 42n)
      Shrunk 0 time(s)
      Counter example:

      false

      ]
    `)
})

it('counter example - false', () => {
    expect(() => {
        forAll(boolean(), (v) => !v, { seed: 43n, timeout: false })
    }).toThrowErrorMatchingInlineSnapshot(`
      [AssertionError: Counter example found after 4 tests (seed: 43n)
      Shrunk 0 time(s)
      Counter example:

      true

      ]
    `)
})

it('cardinality', () => {
    expect(boolean().supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot('2')
})
