import { dict } from './dict.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { string } from '../string/index.js'

describe('dict', () => {
    test('random sample', () => {
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
                "": "Z)",
                "J&O)";": "o^",
                "N": "gagAZ",
                "h&/,QPu": "T+Y",
                "jBfi]}": "\\Z'2{B2M",
                "uNZ": "3A\`;4Rr",
                "z{S#,": "B_4",
              },
              {
                "&o(l%": "",
                "H-I+#9": "1> \\T",
              },
              {
                "": ":",
                "8eqg|": "lM",
                "=xk@$n[": "h;m[>?",
                "OGQw6(c": "^/cK'",
                "^9": "|K{W?CJ",
                "vHwh^\\^C": "*Wo8'C)+:",
              },
              {
                "/&Jo)(EY": "$ip*j",
                "pwbs": "",
                "}": "p'w3_m",
              },
              {
                "$P%": "",
                "8vaBq% xI": "nZ5$X",
              },
              {
                "": "",
                ",eX": "QhL",
                "6,DA": "F%",
                "?Q-": "+8V,yf:o[",
                "]SQ??": "S*L5]/Qx\\",
                "^}M&": "=p}",
                "phv": "#^<Qre3 ",
                "t/]\\<kM<": "IgfG",
              },
              {
                ":.E!<b": "7b>;-8;j_",
                "V"xo": "6,e\\b"1,W",
                "[}JQ\\": "",
                "v>3": "",
              },
              {
                "": "0;=1Xg",
                ",Y_x,f": "]J:.G^*5",
                "z}LGp_": "G_d+HW*-=",
              },
              {},
              {
                "": "",
                "!kuz\\@wGY": "{k+5QLpV",
                "?kC2>z'_": "kT",
                "fvrOBW": "t&v(Qzm",
                "jm0": "CRz*Ya",
                "kIiVX[": "x 4?",
                "m7a[": "jMw8",
                "ojD%:cf^+": "$:OwV9",
              },
            ]
        `)
    })
})
