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
        "r0150GL",
        "b4002oV",
        "q3845LF",
        "i6214TP",
        "t3675ZW",
        "q5018sE",
        "m4884bD",
        "j3616OB",
        "e1448qN",
        "d5145NR",
      ]
    `)
})
