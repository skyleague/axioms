import { propertyKey } from './property-key.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, describe, it } from 'vitest'

describe('dict', () => {
    it('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = propertyKey()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
          [
            "Dc",
            Symbol(),
            -468159077,
            -1507935664,
            1013760582.548079,
            2070318677,
            813063012,
            668940130.0931497,
            Symbol(7BICulSUp),
            Symbol(uCZm4xxjp),
          ]
        `)
    })
})
