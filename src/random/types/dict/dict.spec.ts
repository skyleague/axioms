import { dict } from './dict.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { string } from '../string/index.js'

import { expect, describe, it } from 'vitest'

describe('dict', () => {
    it('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = dict(string())
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
          [
            {
              "#'D0-9e+": "?1cf",
              "L#": ",\`M]rxzIT",
            },
            {
              "w?Kn2uCD.": "Q4",
            },
            {
              "'&\`RK": "8m!=!",
              "MhBy]<(": "_bvZDW{",
              "|": "u#.SHMR{K",
            },
            {
              "": ",C[c6f",
              "CRN": "",
              "a)l[w7Fj": ""^1@m",
              "b\\i#^IrGW": ",tucc&TrF",
            },
            {
              "": "L",
              "#_)vT}": "DE",
              ",?M#'A\\": "F2C7TR",
              "d&lBb{/GZ": ":,Z:EszLc",
            },
            {},
            {},
            {},
            {
              "": "/]*,",
              ")]"r": "$aa#&q",
              "8*"Q": "y|P.t"",
            },
            {},
          ]
        `)
    })
})
