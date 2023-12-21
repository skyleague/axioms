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
              "": "RK+|b_",
              ",\`M]rxzIT": "?1cf",
              "CD.7Q4]jM": "By]<(U'",
              "L#": "#'D0-9e+",
              "|w": "Kn2",
            },
            {
              "": ""^1@m",
              ",C[c6f": ")\`#_)vT}",
              ",tucc&TrF": "",
              "ZDW{S8m!=": "",
              "b\\i#^IrGW": "CRN",
              "d&lBb{/GZ": ",?M#'A\\",
              "u#.SHMR{K": "ra)l[w7Fj",
            },
            {
              "3DEt": ",Z",
            },
            {
              ".": "X",
              "szL": "[F2C7TR",
            },
            {
              "//0$S": "1!",
              "M8*"Q&Y$": "a#&q\`y",
              "P.t"L/]*,": "v",
              "]": "",
            },
            {
              "": "cAU",
              " "": "g{OQlF3z8",
              "#VEdHO8w;": "VxL=n%k%E",
              "$\`7H[12V ": "+:cI(.",
              "*p": "",
              ".": ",L-}s",
              "S=YnNw?WO": "/pr:G,BSO",
              "[_53fv=YD": "c+",
              "u$p": "0ywrRp",
            },
            {
              "]": "\`",
            },
            {
              "$f&d8L": "kvy8 C",
              ") llVzC": "",
              "/voE.": "J*Oy?d6|)",
              "55:L": "hP]",
              "8t": ",^.>-|kJ6",
              "O": "y%WRM",
              "_<3S'": "PuM",
              "i$'": "/Rv0,CMZa",
            },
            {
              "!": "q;",
              "0#qr": "%*[xH-",
              "6ra)": "Ot\\"",
              "C{8X,_2lN": "",
              "t.-'D": "",
            },
            {
              "@?KFQ7?": "o)OH",
              "Cl&<N=": "2c",
              "WP": "QsFEgn",
              "bM=SPjmlj": "O-i5kB=$",
              "kN{(H/"": "?J")\\] 4G",
            },
          ]
        `)
    })
})
