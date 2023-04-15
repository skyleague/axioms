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
              "",
              511147728,
              552579827,
              -1857613534.1016269,
              "b",
              -922310815.3130794,
              Symbol(x4EMSm),
              814199275.2469049,
              -1215596764.501048,
              "MWxUWO93",
            ]
        `)
    })
})
