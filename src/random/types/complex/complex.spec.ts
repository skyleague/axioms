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
                  true,
                  false,
                  false,
                  null,
                  false,
                  "{B",
                ],
                "M": false,
                "S#,EB_4hh": ",",
                "^CuNZc3A": null,
              },
              {
                "6(cO^/cK'": true,
                "8'C)+:aO": 133038609.65790606,
                "=T+Y.NUga": {
                  " \\T": -1854482508.063562,
                  "(l%!Y$-:": null,
                  ";aH-I+": "T1",
                },
                "Hwh^\\^C|*": null,
                "qg|;lM:": null,
              },
              {
                "": "IPnZ5$XD$",
                "$ip*j": 1954692224,
                "%'o?,": {
                  "5]/Q": null,
                  "QhL": "",
                  "^}M&": -792887155,
                  "pt/]\\<": null,
                  "}X]SQ??v": -1671390927.3334527,
                },
                "(": 478895048.76524544,
                "K{W?CJh=x": {
                  "": null,
                  "^h;m[>": -529415764,
                  "pwbs": "}",
                },
                "p'w3_m": {
                  "": 1479671517.7352223,
                },
                "va": 1597975625.263883,
              },
              {
                "%Dph": [
                  "<Qre3 ",
                  -703650154,
                  -1523019393.3933492,
                  null,
                  "V,",
                  null,
                  true,
                  null,
                ],
                "D": -911500469.8247929,
                "IgfG": true,
              },
              {
                "": null,
                ".E": "by7",
                ">;-8;j_": false,
                "v>3": "[}JQ\\",
              },
              {
                "+HW*-=&": null,
                "9'"Fm": 865367527,
                ";": -1349975950.3410072,
                "J:.G^*": -1915662675,
                "_": "Ow",
                "g\`,Y_": [
                  false,
                ],
                "p_yG": null,
                "zojD%:cf": null,
                "}6,e\\b"1": "@\\z}L",
              },
              {
                "": -707660419,
                "*Ya#tA643": [
                  1082388115,
                  "?kC2>z'_",
                  1322158621,
                  735956910.699203,
                  null,
                  1201294929.9210157,
                  432964469.22322416,
                  true,
                  null,
                ],
                "Mw8v!ku": [
                  1828669687,
                  457014330.14620686,
                  null,
                  null,
                  null,
                  "QL",
                ],
                "V $<jm0\\": 155600093.48151302,
              },
              {
                ")=ip9h": -348979637.6679416,
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
                "Bi'a": null,
                "U>aLV<:$,": {
                  "": true,
                  "6._": null,
                  ":dXtpZ": true,
                  "];w7eoa": "3g4",
                  "z": "BEf9.p+O",
                },
                "Wr!MTxa$": false,
                "rOBWit&v(": false,
              },
              {
                "$eK?4{_": "nW:!5s:S",
                "+9[|": false,
                ";#A": -1657319970.2236514,
                ">u%s'"+sr": [
                  -2039383630,
                  "{lT/[",
                ],
                "GF": {
                  "": null,
                  "'": "Vb JT}4S'",
                  "0&(9/": 1879672097,
                  "Q<b}%"": "x7OtR3Q",
                  "[cI\`XL": "pq#x9#\`^",
                  "c": "Ij;Nymv"?",
                  "ft": false,
                },
                "OVDAGUe^-": [],
                "h.&f": -603195536.3852448,
                "j*wqlWnE": null,
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
                  true,
                  false,
                  false,
                  null,
                  false,
                  "{B",
                ],
                "M": false,
                "S#,EB_4hh": ",",
                "^CuNZc3A": null,
              },
              {
                "6(cO^/cK'": true,
                "8'C)+:aO": 133038609.65790606,
                "=T+Y.NUga": {
                  " \\T": -1854482508.063562,
                  "(l%!Y$-:": null,
                  ";aH-I+": "T1",
                },
                "Hwh^\\^C|*": null,
                "qg|;lM:": null,
              },
              {
                "": "IPnZ5$XD$",
                "$ip*j": 1954692224,
                "%'o?,": {
                  "5]/Q": null,
                  "QhL": "",
                  "^}M&": -792887155,
                  "pt/]\\<": null,
                  "}X]SQ??v": -1671390927.3334527,
                },
                "(": 478895048.76524544,
                "K{W?CJh=x": {
                  "": null,
                  "^h;m[>": -529415764,
                  "pwbs": "}",
                },
                "p'w3_m": {
                  "": 1479671517.7352223,
                },
                "va": 1597975625.263883,
              },
              {
                "%Dph": [
                  "<Qre3 ",
                  -703650154,
                  -1523019393.3933492,
                  null,
                  "V,",
                  null,
                  true,
                  null,
                ],
                "D": -911500469.8247929,
                "IgfG": true,
              },
              {
                "": null,
                ".E": "by7",
                ">;-8;j_": false,
                "v>3": "[}JQ\\",
              },
              {
                "+HW*-=&": null,
                "9'"Fm": 865367527,
                ";": -1349975950.3410072,
                "J:.G^*": -1915662675,
                "_": "Ow",
                "g\`,Y_": [
                  false,
                ],
                "p_yG": null,
                "zojD%:cf": null,
                "}6,e\\b"1": "@\\z}L",
              },
              {
                "": -707660419,
                "*Ya#tA643": [
                  1082388115,
                  "?kC2>z'_",
                  1322158621,
                  735956910.699203,
                  null,
                  1201294929.9210157,
                  432964469.22322416,
                  true,
                  null,
                ],
                "Mw8v!ku": [
                  1828669687,
                  457014330.14620686,
                  null,
                  null,
                  null,
                  "QL",
                ],
                "V $<jm0\\": 155600093.48151302,
              },
              {
                ")=ip9h": -348979637.6679416,
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
                "Bi'a": null,
                "U>aLV<:$,": {
                  "": true,
                  "6._": null,
                  ":dXtpZ": true,
                  "];w7eoa": "3g4",
                  "z": "BEf9.p+O",
                },
                "Wr!MTxa$": false,
                "rOBWit&v(": false,
              },
              {
                "$eK?4{_": "nW:!5s:S",
                "+9[|": false,
                ";#A": -1657319970.2236514,
                ">u%s'"+sr": [
                  -2039383630,
                  "{lT/[",
                ],
                "GF": {
                  "": null,
                  "'": "Vb JT}4S'",
                  "0&(9/": 1879672097,
                  "Q<b}%"": "x7OtR3Q",
                  "[cI\`XL": "pq#x9#\`^",
                  "c": "Ij;Nymv"?",
                  "ft": false,
                },
                "OVDAGUe^-": [],
                "h.&f": -603195536.3852448,
                "j*wqlWnE": null,
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
                  "\`;4": 1620149363.6140208,
                  "jBfi]}": null,
                },
              ],
              [
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
                247665140.36149836,
              ],
              [
                -37595281,
                null,
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
                false,
              ],
              [],
              [
                null,
                938605903,
                true,
                true,
                {
                  "": "^p'w3_mn/",
                  "$ip*j": 1954692224,
                  "(": 478895048,
                  "Npw": false,
                  "va": 1597975625,
                  "xk@": "[^h;m[>?",
                  "{W?C": 1149189312.8037286,
                  "|;lM:^9": false,
                },
              ],
              [],
              [
                false,
                null,
                -1963564757,
                null,
              ],
              [],
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
                  true,
                  2041343913,
                  -1290686676,
                  235968099.6449852,
                  null,
                  null,
                ],
              },
              true,
              "B_4",
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
            "Counter example found after 11 tests (seed: 42n)
            Shrunk 1 time(s)
            Counter example:

            0"
        `)
    })

    test('parse stringify x != object x fails', () => {
        expect(() => {
            forAll(json({ type: 'value' }), (j) => !isObject(j), { seed: 42n })
        }).toThrowErrorMatchingInlineSnapshot(`
            "Counter example found after 5 tests (seed: 42n)
            Shrunk 10 time(s)
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
