import { float } from './float.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, describe, it } from 'vitest'

describe('dict', () => {
    it('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
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
})
