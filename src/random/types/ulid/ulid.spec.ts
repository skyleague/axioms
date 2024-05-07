import { expect, it } from 'vitest'
import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { ulidArbitrary } from './ulid.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = ulidArbitrary()
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10,
            ),
        ),
    ).toMatchInlineSnapshot(`
      [
        "EM763FXE3HIUTMAEZKPCSNRNZV",
        "0JJ5B3U4CAZY7RPZTLBG4MWNT4",
        "0UKHIKG2A7MQMHLG6IFYP6JLAO",
        "BGD25FAODWIR7UAPIHXRWMERUM",
        "07NICLFVYT7NTI4VKYEKX5ZLGS",
        "FQOZNWJB7SPLFSUHNHU7PTOYQX",
        "HAX4HRUBOF6CZISRPN6Y2OEJTQ",
        "DP5QSZCNVHR2RT2T6VOWSWEMIC",
        "CV4CZPZNX4F7MIYWERXESMCVT2",
        "F7SH0PI4NPIFVD2AS77N6LWB3D",
      ]
    `)
})

it('random sample - xl', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
    const aint = ulidArbitrary()
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10,
            ),
        ),
    ).toMatchInlineSnapshot(`
      [
        "EM763FXE3HIUTMAEZKPCSNRNZV",
        "0JJ5B3U4CAZY7RPZTLBG4MWNT4",
        "0UKHIKG2A7MQMHLG6IFYP6JLAO",
        "BGD25FAODWIR7UAPIHXRWMERUM",
        "07NICLFVYT7NTI4VKYEKX5ZLGS",
        "FQOZNWJB7SPLFSUHNHU7PTOYQX",
        "HAX4HRUBOF6CZISRPN6Y2OEJTQ",
        "DP5QSZCNVHR2RT2T6VOWSWEMIC",
        "CV4CZPZNX4F7MIYWERXESMCVT2",
        "F7SH0PI4NPIFVD2AS77N6LWB3D",
      ]
    `)
})
