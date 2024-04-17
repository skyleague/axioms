import { json, primitive, unknown } from './index.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { isObject } from '../../../guard/index.js'
import { equal, take } from '../../../iterator/index.js'
import { forAll } from '../../../random/arbitrary/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { oneOf, constant } from '../index.js'

import { expect, describe, it } from 'vitest'

const isPrintable = (str: string) => /^[ -~]+$/.test(str)

describe('json', () => {
    it('random sample - default', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
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
            {
              "#l#'E": false,
              ".": false,
            },
            {
              "'&aRK+": true,
              "5]kNh": {},
              "K?1dg8": true,
              "^sy{I": null,
              "b\`cvZDX|T8": false,
              "x?Ko2vCD.7": false,
              "z^<)": false,
            },
            {
              "": true,
              ")wU~vd&": false,
              "1@nx,uv": true,
              "<CSN!R": -1366831427,
              "Bb|/H[f-?": false,
              "D": ")^"rM",
              "]i#_JsG": true,
              "a)m[x7Fjw": true,
              "d&TsF%Z": {
                "Et{": true,
                "[": false,
                "c[F2D": true,
              },
              "d6go)a": true,
            },
            {
              "": false,
              " "": false,
              "#&raz}P": false,
              "/]*,+": {
                "": false,
                "+:dI(/<": false,
                "7H\\12W ": false,
                ":H,CSO@v$": false,
                "=YoNx": true,
                "WP{": false,
                "Z1zxsSqu$": false,
                "\`53gw>": true,
                "dAUx": false,
                "q": false,
              },
              "X001$S91!z": null,
              "h|PQmG4{8,": true,
              "t": true,
            },
            {
              "0ar<8uw": false,
            },
            {
              "J7b$g&e9": "<3T'@Qv",
              "Zkwz8": true,
              "}": true,
            },
            {},
            {
              ") mmW{D&": "]RsGE",
              "0-CN[bN55:": true,
              "@iP^Q": {
                "6sa)N": false,
                "9X,\`2mO#H1": true,
                "u]"xC": null,
              },
              "E.|K*Pz?e": [
                false,
                {
                  "": true,
                  "")\\^ ": false,
                  "=TQjn": true,
                  "Dm&<O=4": false,
                  "N|(I/"u?": false,
                  "cg": true,
                  "kmP-j6lC=": true,
                },
              ],
              "P": 1438433845.1447096,
              "R": true,
              "Tu.-'D": false,
              "w": false,
              "z%XRM": true,
              "})": true,
            },
            {
              "C": -1854563074,
              "pG2b": {
                "MZ:lwOB": true,
                "bqt38QRI": "nV:",
                "c": false,
                "y/-PbR": false,
              },
            },
            {
              "": false,
              "'9ux&&": 1443315292.1033792,
              "?F": true,
              "DY": -1527304570,
              "H(j?o<UjR": null,
              "I0xn^>$": false,
              "I_.": false,
              "Ts|1": 1972541512,
              "Y]_(7M{^u": "@t;ZKI8",
              "e9[[-g": true,
            },
          ]
        `)
    })

    it('random sample - object', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
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
            {
              "#l#'E": false,
              ".": false,
            },
            {
              "'&aRK+": true,
              "5]kNh": {},
              "K?1dg8": true,
              "^sy{I": null,
              "b\`cvZDX|T8": false,
              "x?Ko2vCD.7": false,
              "z^<)": false,
            },
            {
              "": true,
              ")wU~vd&": false,
              "1@nx,uv": true,
              "<CSN!R": -1366831427,
              "Bb|/H[f-?": false,
              "D": ")^"rM",
              "]i#_JsG": true,
              "a)m[x7Fjw": true,
              "d&TsF%Z": {
                "Et{": true,
                "[": false,
                "c[F2D": true,
              },
              "d6go)a": true,
            },
            {
              "": false,
              " "": false,
              "#&raz}P": false,
              "/]*,+": {
                "": false,
                "+:dI(/<": false,
                "7H\\12W ": false,
                ":H,CSO@v$": false,
                "=YoNx": true,
                "WP{": false,
                "Z1zxsSqu$": false,
                "\`53gw>": true,
                "dAUx": false,
                "q": false,
              },
              "X001$S91!z": null,
              "h|PQmG4{8,": true,
              "t": true,
            },
            {
              "0ar<8uw": false,
            },
            {
              "J7b$g&e9": "<3T'@Qv",
              "Zkwz8": true,
              "}": true,
            },
            {},
            {
              ") mmW{D&": "]RsGE",
              "0-CN[bN55:": true,
              "@iP^Q": {
                "6sa)N": false,
                "9X,\`2mO#H1": true,
                "u]"xC": null,
              },
              "E.|K*Pz?e": [
                false,
                {
                  "": true,
                  "")\\^ ": false,
                  "=TQjn": true,
                  "Dm&<O=4": false,
                  "N|(I/"u?": false,
                  "cg": true,
                  "kmP-j6lC=": true,
                },
              ],
              "P": 1438433845.1447096,
              "R": true,
              "Tu.-'D": false,
              "w": false,
              "z%XRM": true,
              "})": true,
            },
            {
              "C": -1854563074,
              "pG2b": {
                "MZ:lwOB": true,
                "bqt38QRI": "nV:",
                "c": false,
                "y/-PbR": false,
              },
            },
            {
              "": false,
              "'9ux&&": 1443315292.1033792,
              "?F": true,
              "DY": -1527304570,
              "H(j?o<UjR": null,
              "I0xn^>$": false,
              "I_.": false,
              "Ts|1": 1972541512,
              "Y]_(7M{^u": "@t;ZKI8",
              "e9[[-g": true,
            },
          ]
        `)
    })

    it('random sample - array', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
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
            [
              true,
            ],
            [],
            [
              true,
              false,
            ],
            [
              false,
              false,
              {
                "!>!xv#.TH": false,
                "'&aRK+": false,
                ")m[x7Fj": -1724756894.6292634,
                "CD.7Q5]kNh": true,
                "ITK?1dg8}x": false,
                "Ko2": true,
                "R|Lws": false,
                "b\`cvZDX|T8": {
                  "vdd&TsF%Z": true,
                },
                "c]i#_JsGW<": true,
                "z^<)": true,
              },
              -1730467961,
              {
                "-?N#'A]1": true,
                "4DEu:": true,
                "Et{": false,
                "[": true,
                "c[F2D": false,
                "vd&mBb|/H[": false,
              },
            ],
            [
              true,
            ],
            [],
            [],
            [
              true,
              {
                " "": null,
                "!z": [
                  false,
                  "x?WP{",
                  false,
                ],
                "001$S9": null,
                "R": true,
                "h|PQmG4{8,": true,
                "w": false,
                "}P.t"M/]*,": true,
              },
              false,
              false,
            ],
            [
              "z",
              [
                false,
                null,
                false,
                true,
                true,
              ],
              false,
              false,
              true,
            ],
            [
              true,
              true,
            ],
          ]
        `)
    })

    it('random sample - value', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
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
            -987316204.8333645,
            -1991294021.561513,
            {},
            true,
            "9",
            {
              ",aM^sy{ITK": true,
            },
            {
              "!>!xv#.TH": {
                "-?N#'A]1": true,
                "4DEu:": true,
                "Et{": false,
                "[": true,
                "c[F2D": false,
                "vd&mBb|/H[": false,
              },
              "'&aRK+": -1976490632,
              "CD.7Q5]kNh": "7Fjwc]i#_J",
              "Ko2": null,
              "R|Lws": true,
              "b\`cvZDX|T8": -1730467961,
              "z^<)": {
                "": false,
                "1@nx,uv": false,
                "<CSN!R": true,
                "d&TsF%Z": -1724756894.6292634,
              },
              "}x": -1719456810,
            },
            true,
            -1847842536.406973,
            null,
          ]
        `)
    })

    it('random sample - xs', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n), depth: 'xs' })
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
            {
              "#l#'E": false,
              ".": false,
            },
            {
              "'&aRK+": true,
              "5]kNh": true,
              "K?1dg8": true,
              "^sy{I": -2070941419,
              "b\`cvZDX|T8": true,
              "x?Ko2vCD.7": {
                "": false,
                "1@nx,uv": true,
                "<CSN!R": true,
                "D": true,
                "NR|L": false,
                "T": false,
                "]i#_JsG": false,
                "d&TsF%Z": true,
                "d6go)a": true,
                "sa)m[x7Fjw": "&mBb|/H",
              },
              "z^<)": null,
            },
            {
              "": true,
              "$": false,
              "&Z$ab": 2042978525.3355026,
              "*,+wX00": false,
              "+": true,
              "+"": false,
              "M)^"rM": {
                "": false,
                "h|PQmG4{8,": true,
              },
              "Mc[F2D7TR,": true,
              "az}P.t"M/": false,
            },
            {
              "": true,
              "+:dI(/<": "",
              "7H\\12W ": -1915442001,
              ":H,CSO@v$": false,
              "D3d+w#": -863183202.7970777,
              "EeHO8x": false,
              "Z1zxsSqu$": true,
              "\`53gw>": false,
              "dAUx": false,
              "q": false,
            },
            {
              "/>-}lJ7": true,
            },
            {},
            {
              "": true,
              "Zkwz8": false,
            },
            {
              "": false,
              "0Rw0-CN[bN": true,
              "5:": false,
              "@iP^Q": false,
              "QvM": -451955888,
              "j$'": false,
            },
            {
              " ": "lC",
              ""xC|9X,": true,
              "%XRMXTu.-'": true,
              "&,!4": "",
              "2mO#H1#": false,
              ";N6sa)NPu": true,
              "cN=TQjnmkm": false,
              "g": true,
              "mW{D&/PS": true,
              "sY%+[yH.U": false,
            },
            {
              """: true,
              ")PH4WP]Rs": false,
              "?K")\\^ 4G": false,
              "@?LGQ7@N": true,
            },
          ]
        `)
    })

    it('parse stringify x == x', () => {
        forAll(json(), (j) => equal(JSON.parse(JSON.stringify(j)), j))
    })

    it('parse stringify x | undefined == x fails (nodejs bug)', () => {
        expect(() => {
            forAll(oneOf(json({ type: 'value' }), constant(undefined)), (j) => equal(JSON.parse(JSON.stringify(j)), j), {
                seed: 42n,
                timeout: false,
            })
        }).toThrowErrorMatchingInlineSnapshot(`
          [AssertionError: Counter example found after 2 tests (seed: 42n)
          Shrunk 0 time(s)
          Counter example:

          undefined

          "undefined" is not valid JSON]
        `)
    })

    it('parse stringify x != x fails', () => {
        expect(() => {
            forAll(json({ type: 'value' }), (j) => !equal(JSON.parse(JSON.stringify(j)), j), { seed: 42n, timeout: false })
        }).toThrowErrorMatchingInlineSnapshot(`
          [AssertionError: Counter example found after 8 tests (seed: 42n)
          Shrunk 1 time(s)
          Counter example:

          0

          ]
        `)
    })

    it('parse stringify x != object x fails', () => {
        expect(() => {
            forAll(json({ type: 'value' }), (j) => !isObject(j), { seed: 42n, timeout: false })
        }).toThrowErrorMatchingInlineSnapshot(`
          [AssertionError: Counter example found after 3 tests (seed: 42n)
          Shrunk 1 time(s)
          Counter example:

          {}

          ]
        `)
    })

    it('all printable', () => {
        forAll(json().map(JSON.stringify), isPrintable)
    })
})

describe('primitive', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
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
            "򀋲鹃",
            null,
            -1806577501,
            true,
            -998293442.9723692,
            null,
            2070318678,
            813063013,
            "󮲰󿯛􅦃񶺮򗣗񼿻񛏫",
            958710102.4790163,
          ]
        `)
    })
})

describe('unknown', () => {
    it('random sample', () => {
        const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
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
            null,
            true,
            1312757735,
            -1806577501,
            "𨠊",
            false,
            2070318678,
            813063012.5310383,
            "󮲰󿯛􅦃񶺮򗣗񼿻񛏫",
            958710102.4790163,
          ]
        `)
    })
})
