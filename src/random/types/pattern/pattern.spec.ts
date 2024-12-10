import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { pattern } from './pattern.js'

import { expect, it } from 'vitest'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const apattern = pattern('a####iA')
    expect(Array.from({ length: 10 }, () => apattern.sample(ctx))).toMatchInlineSnapshot(`
      [
        "n2408bB",
        "j1127gY",
        "d6468WY",
        "k5431LS",
        "g9934RE",
        "w3312BF",
        "q7473XQ",
        "h0500JN",
        "l1976KW",
        "p3595nU",
      ]
    `)
})
