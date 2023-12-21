import { pattern } from './pattern.js'

import { collect, repeat, take } from '../../../index.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { it, expect } from 'vitest'

it('random sample', () => {
    const ctx = { rng: xoroshiro128plus(1638968569864n) }
    const apattern = pattern('a####iA')
    expect(
        collect(
            take(
                repeat(() => apattern.sample(ctx)),
                10
            )
        )
    ).toMatchInlineSnapshot(`
      [
        "n2407bB",
        "j1126gY",
        "d6457WY",
        "k5431LS",
        "g8824RE",
        "w3312BF",
        "q7463XQ",
        "h0500JN",
        "l1866KW",
        "p3584nU",
      ]
    `)
})
