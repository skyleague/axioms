import { groupBy, replicate } from '../../../iterator/index.js'
import { mapValues } from '../../../object/index.js'
import { boolean, forAll, arbitraryContext, xoroshiro128plus } from '../../../random/index.js'

import { expect, it } from 'vitest'

it('distribution', () => {
    const context = arbitraryContext({
        rng: xoroshiro128plus(42n),
    })

    expect(
        mapValues(
            groupBy(
                replicate(() => boolean().sample(context), 1000),
                (x) => x.toString()
            ),

            (v) => v.length
        )
    ).toMatchInlineSnapshot(`
        {
          "false": 509,
          "true": 491,
        }
    `)
})

it('counter example - true', () => {
    expect(() => forAll(boolean(), (v) => v, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 6 tests (seed: 42n)
        Shrunk 0 time(s)
        Counter example:

        false"
    `)
})

it('counter example - false', () => {
    expect(() => forAll(boolean(), (v) => !v, { seed: 42n })).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 1 tests (seed: 42n)
        Shrunk 0 time(s)
        Counter example:

        true"
    `)
})
