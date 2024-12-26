import { expect, it } from 'vitest'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/forall.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { ulidArbitrary } from './ulid.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = ulidArbitrary()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "4CZYV5Q4V78MKC04SAF2JDHDSN",
        "099X1VMW20SRZHFSKB16WCPDKW",
        "0MA78A6T0ZCGC7B6Y85RFY9B0E",
        "163TX50E3P8HZM0F87QHPC4HMC",
        "0ZD82B5NRKZDK8WNAR4AQXSB6J",
        "5GESDP91ZJFB5JM7D7MZFKERGQ",
        "70QW7HM1E5Y2S8JHFDYRTE49KG",
        "3FXGJS2DN7HTHKTKYNEPJP4C82",
        "2NW2SFSDQW5ZC8RP4HQ4JC2NKT",
        "5ZJ70F8WDF85N3T0JZZDYBP1V3",
      ]
    `)
})

it('random sample - xl', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), size: 'xl' as const })
    const aint = ulidArbitrary()
    expect(Array.from({ length: 10 }, () => aint.sample(ctx))).toMatchInlineSnapshot(`
      [
        "4CZYV5Q4V78MKC04SAF2JDHDSN",
        "099X1VMW20SRZHFSKB16WCPDKW",
        "0MA78A6T0ZCGC7B6Y85RFY9B0E",
        "163TX50E3P8HZM0F87QHPC4HMC",
        "0ZD82B5NRKZDK8WNAR4AQXSB6J",
        "5GESDP91ZJFB5JM7D7MZFKERGQ",
        "70QW7HM1E5Y2S8JHFDYRTE49KG",
        "3FXGJS2DN7HTHKTKYNEPJP4C82",
        "2NW2SFSDQW5ZC8RP4HQ4JC2NKT",
        "5ZJ70F8WDF85N3T0JZZDYBP1V3",
      ]
    `)
})

it('is a valid ULID', () => {
    forAll(ulidArbitrary(), (x) => /^[0-9A-HJKMNP-TV-Z]{26}$/i.test(x))
})
