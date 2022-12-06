import { json, primitive, unknown } from '.'

import { oneOf, constant } from '..'
import { collect } from '../../../array'
import { repeat } from '../../../generator'
import { isObject } from '../../../guard'
import { equal, take } from '../../../iterator'
import { forAll } from '../../../random/arbitrary'
import { xoroshiro128plus } from '../../rng'

describe('json', () => {
    test('random sample - default', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = json()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              {},
              {
                "": null,
                "&O)"": -922310815.3130794,
                "4R": [
                  {
                    "2MT": null,
                    "S#,EB_4hh": ",",
                    "i]}t\\Z'": 2041343913,
                  },
                  false,
                  [
                    -1613684017.6056929,
                    true,
                    318756175.68477106,
                  ],
                  {
                    "$-:ovH": null,
                    "'C": ":",
                    "AZ;aH-I": "",
                    "T1": -2135896712,
                    "TO&o(l": "",
                    "^\\^C|*W": null,
                  },
                  null,
                  true,
                ],
                "^CuNZc3A": null,
                "c": true,
                "w6(cO": null,
              },
              {
                "i|": false,
                "qg|;lM:": null,
              },
              {
                "": [
                  [
                    "\\b"1,W@",
                    false,
                  ],
                  [
                    1552320237.5759845,
                    false,
                    740455349.9697752,
                    true,
                  ],
                  false,
                  "=",
                  "0;=1Xg",
                  null,
                  "_x,fq]",
                  true,
                ],
                "7b>;-8;j_": false,
                "Jh=": [
                  -1933947914.9898486,
                  {
                    "": 478895048,
                    "$ip*j": 1954692224,
                    "%'o?,": false,
                    "h;m[>?": -42506726,
                    "va": 1597975625,
                    "wbs(2}^p": "3_mn/&Jo)",
                  },
                  126823370.81789923,
                  {
                    "": "^}M&",
                    "=p}": 676192943.8861442,
                    "Q??vS": "5]/Q",
                    "\\pt/]\\<kM": -255391163,
                  },
                  false,
                  {
                    "": 1514242924,
                    "-{+8V": "f:o[N@v>3",
                    "6,DA": -383186582,
                    "vr#^<Qr": true,
                  },
                  "[}JQ\\",
                  ":.E!<b",
                ],
              },
              {
                "": [
                  -1996766070.551179,
                  -331832642.3000579,
                  "GF",
                ],
                "*5%szo": {
                  "": 936170238,
                  "'"": 1392047439.7897224,
                  "^+_$:Ow": null,
                },
                "a[": false,
                "w8v!": {
                  "+p#OP/oaI": {
                    "": "rIX)?m>",
                    "%4N8t": -896571183.7950864,
                    "(L(": "jttt",
                    ",RO"s": -485183678.6566415,
                    "<(": null,
                    "Gn^D_q6xY": null,
                    "Qd}F\\$": 471181554,
                    "][QrI\`4I*": "+IZ<7",
                    "}!g}86": null,
                  },
                  "/": {
                    "": 897696461,
                    "QThaKgxG": null,
                    "V$}gB": true,
                    "]"^bS?m@g": "[7CK(",
                  },
                  "0\\CRz*Ya": "A643}v7f,",
                  "?kC2>z'_": 1322158621,
                  "Bi'a": null,
                  "Gx 4?Y": {
                    "": true,
                    ")=ip9h": -348979638,
                    "6._": null,
                    ":dXtpZ": true,
                    "OBWit&v(": 1990111604.1466737,
                    "U>aLV<:$,": false,
                    "Wr!MTxa$": 1511454183.3540215,
                    "];w7eoa": "3g4",
                    "z": "BEf9.p+O",
                  },
                  "\\@wGYo{k+": 114794925,
                  "_kIiV": null,
                  "pV $": 1275647960.830038,
                },
              },
              {
                ")pZQ<b}%"": "x7OtR3Q",
                "+'6nf?,sz": "et",
                "0&(9/": 1879672097.0014515,
                "9yE9J": {
                  "N"i\`": 879207728,
                  "Yn\`Jq": 909549175,
                  "n\\y.'x4x": 1226349204,
                  "og\`t:": 708885313,
                },
                "c": 1745780474,
                "ft": null,
                "j;Ny": {
                  "": -1526169009.0051918,
                  "$eK?4{_": "nW:!5s:S",
                  "+9[|": false,
                  ">u%s'"+sr": [
                    -2039383630,
                    "{lT/[",
                  ],
                  "OVDAGUe^-": [],
                  "U:!C(rM5-": ".\`W-",
                  "[cI\`XL": "pq#x9#\`^",
                  "h.&f": -603195536.3852448,
                  "j*wqlWnE": null,
                },
              },
              {
                "": false,
                "d+": -190763300,
                "f$abO{": null,
                "x#\`U(": [],
              },
              {
                "$t": 575858676,
                "Z,gfgvOk": "",
              },
              {
                "": {
                  "": "n)",
                  " o>^90": {},
                  ""\\'Ty'": null,
                  "%n}?": false,
                  ",oJG*5": null,
                  "9WgPYk": null,
                  ";": 704892963,
                  "n<)&c%h0j": 1934614049.6875834,
                  "pt 4@@W": true,
                },
                "@aChUiD": "4'_",
              },
              {
                "/P:4": -1327806110,
                "lSo]3S?5": 922347525.699781,
                "lu:W": -1439736643,
              },
            ]
        `)
    })

    test('random sample - object', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = json({ type: 'object' })
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              {},
              {
                "": null,
                "&O)"": -922310815.3130794,
                "4R": [
                  {
                    "2MT": null,
                    "S#,EB_4hh": ",",
                    "i]}t\\Z'": 2041343913,
                  },
                  false,
                  [
                    -1613684017.6056929,
                    true,
                    318756175.68477106,
                  ],
                  {
                    "$-:ovH": null,
                    "'C": ":",
                    "AZ;aH-I": "",
                    "T1": -2135896712,
                    "TO&o(l": "",
                    "^\\^C|*W": null,
                  },
                  null,
                  true,
                ],
                "^CuNZc3A": null,
                "c": true,
                "w6(cO": null,
              },
              {
                "i|": false,
                "qg|;lM:": null,
              },
              {
                "": [
                  [
                    "\\b"1,W@",
                    false,
                  ],
                  [
                    1552320237.5759845,
                    false,
                    740455349.9697752,
                    true,
                  ],
                  false,
                  "=",
                  "0;=1Xg",
                  null,
                  "_x,fq]",
                  true,
                ],
                "7b>;-8;j_": false,
                "Jh=": [
                  -1933947914.9898486,
                  {
                    "": 478895048,
                    "$ip*j": 1954692224,
                    "%'o?,": false,
                    "h;m[>?": -42506726,
                    "va": 1597975625,
                    "wbs(2}^p": "3_mn/&Jo)",
                  },
                  126823370.81789923,
                  {
                    "": "^}M&",
                    "=p}": 676192943.8861442,
                    "Q??vS": "5]/Q",
                    "\\pt/]\\<kM": -255391163,
                  },
                  false,
                  {
                    "": 1514242924,
                    "-{+8V": "f:o[N@v>3",
                    "6,DA": -383186582,
                    "vr#^<Qr": true,
                  },
                  "[}JQ\\",
                  ":.E!<b",
                ],
              },
              {
                "": [
                  -1996766070.551179,
                  -331832642.3000579,
                  "GF",
                ],
                "*5%szo": {
                  "": 936170238,
                  "'"": 1392047439.7897224,
                  "^+_$:Ow": null,
                },
                "a[": false,
                "w8v!": {
                  "+p#OP/oaI": {
                    "": "rIX)?m>",
                    "%4N8t": -896571183.7950864,
                    "(L(": "jttt",
                    ",RO"s": -485183678.6566415,
                    "<(": null,
                    "Gn^D_q6xY": null,
                    "Qd}F\\$": 471181554,
                    "][QrI\`4I*": "+IZ<7",
                    "}!g}86": null,
                  },
                  "/": {
                    "": 897696461,
                    "QThaKgxG": null,
                    "V$}gB": true,
                    "]"^bS?m@g": "[7CK(",
                  },
                  "0\\CRz*Ya": "A643}v7f,",
                  "?kC2>z'_": 1322158621,
                  "Bi'a": null,
                  "Gx 4?Y": {
                    "": true,
                    ")=ip9h": -348979638,
                    "6._": null,
                    ":dXtpZ": true,
                    "OBWit&v(": 1990111604.1466737,
                    "U>aLV<:$,": false,
                    "Wr!MTxa$": 1511454183.3540215,
                    "];w7eoa": "3g4",
                    "z": "BEf9.p+O",
                  },
                  "\\@wGYo{k+": 114794925,
                  "_kIiV": null,
                  "pV $": 1275647960.830038,
                },
              },
              {
                ")pZQ<b}%"": "x7OtR3Q",
                "+'6nf?,sz": "et",
                "0&(9/": 1879672097.0014515,
                "9yE9J": {
                  "N"i\`": 879207728,
                  "Yn\`Jq": 909549175,
                  "n\\y.'x4x": 1226349204,
                  "og\`t:": 708885313,
                },
                "c": 1745780474,
                "ft": null,
                "j;Ny": {
                  "": -1526169009.0051918,
                  "$eK?4{_": "nW:!5s:S",
                  "+9[|": false,
                  ">u%s'"+sr": [
                    -2039383630,
                    "{lT/[",
                  ],
                  "OVDAGUe^-": [],
                  "U:!C(rM5-": ".\`W-",
                  "[cI\`XL": "pq#x9#\`^",
                  "h.&f": -603195536.3852448,
                  "j*wqlWnE": null,
                },
              },
              {
                "": false,
                "d+": -190763300,
                "f$abO{": null,
                "x#\`U(": [],
              },
              {
                "$t": 575858676,
                "Z,gfgvOk": "",
              },
              {
                "": {
                  "": "n)",
                  " o>^90": {},
                  ""\\'Ty'": null,
                  "%n}?": false,
                  ",oJG*5": null,
                  "9WgPYk": null,
                  ";": 704892963,
                  "n<)&c%h0j": 1934614049.6875834,
                  "pt 4@@W": true,
                },
                "@aChUiD": "4'_",
              },
              {
                "/P:4": -1327806110,
                "lSo]3S?5": 922347525.699781,
                "lu:W": -1439736643,
              },
            ]
        `)
    })

    test('random sample - array', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = json({ type: 'array' })
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              [],
              [
                "J&O)";",
                1497140825,
                null,
                1749221268.0367875,
                false,
                {
                  "\`;4": false,
                  "jBfi]}": [
                    true,
                    2041343913,
                    -1290686676,
                    235968099.6449852,
                    null,
                    null,
                  ],
                },
              ],
              [],
              [
                749266094.102212,
                1187159361,
                {},
              ],
              [
                false,
              ],
              [
                true,
                null,
                -37595281,
              ],
              [
                null,
                {
                  " \\T": true,
                  "(l%!Y$-:": {
                    "": "^p'w3_mn/",
                    "*Wo8'C)+:": false,
                    "/cK'O8": false,
                    "Npw": false,
                    "Qw6(": false,
                    "wh^\\": true,
                    "xk@": "[^h;m[>?",
                    "{W?C": 1149189312.8037286,
                    "|;lM:^9": false,
                  },
                  ";aH-I+": "T1",
                },
                "o)(E",
                null,
                true,
                {
                  "": "IPnZ5$XD$",
                  "%'o?,": {
                    "5]/Q": null,
                    "QhL": "",
                    "^}M&": -792887155,
                    "pt/]\\<": null,
                    "}X]SQ??v": -1671390927.3334527,
                  },
                  "7b>;-8;j_": false,
                  "<IIg": {
                    "": 1514242924,
                    "-{+8V": "f:o[N@v>3",
                    "6,DA": -383186582,
                    "vr#^<Qr": true,
                  },
                  "Gp_y": 740455349.9697752,
                  "JQ\\"\`:.E!": 891808492.6557064,
                  "j": 1954692224,
                  "va": 1597975625.263883,
                },
                {
                  "W*-=": "0;=1Xg",
                },
              ],
              [
                null,
              ],
              [
                "q]J:.G^",
                "%s",
                [
                  {
                    "": 936170238,
                    "^+_$:Ow": -991340992.6241989,
                    "jMw8": null,
                  },
                  "uz\\@wGY",
                  {
                    ")=ip9h": -348979638,
                    "+5QLpV $": 1275647960,
                    "0\\CRz*Ya": "A643}v7f,",
                    "?kC2>z'_": 1322158621,
                    "U>aLV<:$,": false,
                    "Wr!MTxa$": 1511454183.3540215,
                    "_kIiV": false,
                    "rOBWit&v(": 1990111604.1466737,
                    "x 4?": false,
                  },
                  {
                    ""?3g4_": 997445170,
                    ""e.?6": "v)/dM ",
                    "bP": -1938059800.8744507,
                    "gBf,oQTha": 1135655005.1754618,
                    "tpZh3": "(mBEf9.p+",
                    "w7": false,
                  },
                  [
                    null,
                    null,
                    true,
                    false,
                  ],
                  true,
                  {
                    " R[7CK(": null,
                    "p": "P/oaI",
                    "v_}!g}8": 1705496847,
                  },
                  -864115577,
                ],
                "u][QrI\`4",
                true,
                "+IZ<7",
                -1776586382.562335,
                true,
                "jttt",
              ],
              [],
            ]
        `)
    })

    test('random sample - value', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = json({ type: 'value' })
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              {},
              511147728,
              "J&O)";",
              1497140825,
              null,
              1749221268.0367875,
              false,
              {
                "\`;4": false,
                "jBfi]}": [
                  null,
                  "{B",
                  -75266417,
                  false,
                  [
                    "E",
                    749266094,
                    1187159361,
                    true,
                    "Q",
                  ],
                  false,
                ],
              },
              247665140.36149836,
              ".NUgag",
            ]
        `)
    })

    test('parse stringify x == x', () => {
        forAll(json(), (j) => equal(JSON.parse(JSON.stringify(j)), j))
    })

    test('parse stringify x | undefined == x fails (nodejs bug)', () => {
        expect(() =>
            forAll(oneOf(json({ type: 'value' }), constant(undefined)), (j) => equal(JSON.parse(JSON.stringify(j)), j), {
                seed: 42n,
            })
        ).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 2 tests (seed: 42n)
        Shrunk 0 time(s)
        Counter example:

        undefined

        Unexpected token u in JSON at position 0"
    `)
    })

    test('parse stringify x != x fails', () => {
        expect(() => forAll(json({ type: 'value' }), (j) => !equal(JSON.parse(JSON.stringify(j)), j), { seed: 42n }))
            .toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 7 tests (seed: 42n)
        Shrunk 1 time(s)
        Counter example:

        0"
    `)
    })

    test('parse stringify x != object x fails', () => {
        expect(() => {
            forAll(json({ type: 'value' }), (j) => !isObject(j), { seed: 42n })
        }).toThrowErrorMatchingInlineSnapshot(`
        "Counter example found after 14 tests (seed: 42n)
        Shrunk 8 time(s)
        Counter example:

        {}"
    `)
    })
})

describe('primitive', () => {
    test('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = primitive()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              null,
              -1226565061,
              Symbol(),
              Symbol(eFgb),
              true,
              null,
              Symbol(4EM),
              null,
              -603896327.1597428,
              Symbol(nH),
            ]
        `)
    })
})

describe('unknown', () => {
    test('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = unknown()
        expect(
            collect(
                take(
                    repeat(() => aint.sample(ctx)),
                    10
                )
            )
        ).toMatchInlineSnapshot(`
            [
              undefined,
              -1226565061,
              null,
              552579827,
              "",
              null,
              -2043076968,
              true,
              [
                false,
                false,
                null,
                -603896327.1597428,
                null,
                -1215596764.501048,
              ],
              null,
            ]
        `)
    })
})
