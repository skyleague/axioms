import { symbol } from './symbol.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'

import { expect, describe, it } from 'vitest'

describe('dict', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
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
            Symbol(qDcXce),
            Symbol(ljqT),
            Symbol(8),
            Symbol(Q),
            Symbol(O267B),
            Symbol(CulSUp),
            Symbol(5uCZm4xxjp),
            Symbol(nOXEV),
            Symbol(6Osf),
            Symbol(eeQHCh),
          ]
        `)
    })
})
