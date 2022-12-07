import { propertyKey } from './property-key'

import { collect } from '../../../array'
import { repeat } from '../../../generator'
import { take } from '../../../iterator'
import { xoroshiro128plus } from '../../rng'

describe('dict', () => {
    test('random sample', () => {
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
