import { float } from './float'

import { collect } from '../../../array'
import { repeat } from '../../../generator'
import { take } from '../../../iterator'
import { xoroshiro128plus } from '../../rng'

describe('dict', () => {
    test('random sample', () => {
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
              921604357.1749024,
              -1817301678.5811677,
              -1226565060.6242733,
              511147728.4609723,
              -1723568134.3746133,
              552579827.575685,
              -207009088.50158548,
              -1857613534.1016269,
              15946192.01222229,
              -1697006872.3155274,
            ]
        `)
    })
})
