import { symbol } from './symbol'

import { collect } from '../../../array'
import { repeat } from '../../../generator'
import { take } from '../../../iterator'
import { xoroshiro128plus } from '../../rng'

describe('dict', () => {
    test('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = symbol()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              Symbol(enMgMCe),
              Symbol(gbsr0),
              Symbol(x4EMSm),
              Symbol(Qsn),
              Symbol(2MWxU),
              Symbol(O93NMem),
              Symbol(wmDI78Hci),
              Symbol(wPn),
              Symbol(VekiGG4),
              Symbol(IhL),
            ]
        `)
    })
})
