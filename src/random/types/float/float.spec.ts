import { float } from './float.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/forall.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { constant } from '../helper/helper.js'
import { integer } from '../integer/integer.js'
import { tuple } from '../tuple/tuple.js'

import { expect, it } from 'vitest'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = float()
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10
            )
        )
    ).toMatchInlineSnapshot(`
          [
            218084955.5757966,
            -987316204.8333645,
            -123414344.79032564,
            -1991294021.561513,
            1312757734.419653,
            -1984378057.5129266,
            -1806577500.5932693,
            -468159076.21629095,
            -1373641555.943141,
            -1507935663.7794366,
          ]
        `)
})

it('check min constraint - inclusive', () => {
    forAll(
        integer({ min: 0, max: 100 }).chain((min) => {
            return tuple(constant(min), float({ min }))
        }),
        ([min, x]) => x >= min,
        { seed: 42n }
    )
})

it('check max constraint - inclusive', () => {
    forAll(
        integer({ min: 0, max: 100 }).chain((max) => {
            return tuple(constant(max), float({ max }))
        }),
        ([max, x]) => x <= max,
        { seed: 42n }
    )
})

it('check min constraint - exclusive', () => {
    forAll(
        integer({ min: 0, max: 100 }).chain((min) => {
            return tuple(constant(min), float({ min, minInclusive: false }))
        }),
        ([min, x]) => x >= min,
        { seed: 42n }
    )
})

it('check max constraint - exclusive', () => {
    forAll(
        integer({ min: 0, max: 10 }).chain((max) => {
            return tuple(constant(max), float({ max, maxInclusive: false }))
        }),
        ([max, x]) => x < max,
        { seed: 42n }
    )
})
