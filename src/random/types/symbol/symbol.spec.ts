import { symbol } from './symbol.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, describe, it } from 'vitest'

describe('dict', () => {
    it('random sample', () => {
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
            Symbol(qDcXc),
            Symbol(),
            Symbol(ljq),
            Symbol(h8iQDO2),
            Symbol(7BICulSUp),
            Symbol(5uCZm4xxj),
            Symbol(Gn),
            Symbol(XEVw6O),
            Symbol(fJe),
            Symbol(),
          ]
        `)
    })
})
