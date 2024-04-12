import { propertyKey } from './property-key.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { describe, expect, it } from 'vitest'

describe('dict', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
        const aint = propertyKey()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10,
                ),
            ),
        ).toMatchInlineSnapshot(`
          [
            "Dc",
            Symbol(),
            -468159076,
            -1507935664,
            1013760582.548079,
            2070318678,
            813063013,
            668940130.0931497,
            Symbol(7BICulSUp8),
            Symbol(CZm),
          ]
        `)
    })
})
