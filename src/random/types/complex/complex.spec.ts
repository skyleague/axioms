import { json, primitive, unknown } from './index.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { isObject } from '../../../guard/index.js'
import { equal, take } from '../../../iterator/index.js'
import { forAll } from '../../../random/arbitrary/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { oneOf, constant } from '../index.js'

import { expect, describe, it } from 'vitest'

describe('json', () => {
    it('random sample - default', () => {
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
            {
              "#k#'": -1373641555.943141,
              "9": {
                ",\`M]rxzIT": -706694403.2852044,
              },
            },
            {
              "": null,
              "8|w?Kn2": [
                -1470553105,
                108001456,
                643485404,
              ],
              "K+|b_": null,
              "MhBy]<(": true,
              "ZDW{S8m!=": "u#.SHMR{K",
              "[c6": {
                "": true,
                ")vT}ud": "Bb{/GZe,",
                "+": true,
                "2C7T": -1571690187.284359,
                "L": -501201442,
                "M#'": 637778531,
                "szL": false,
                "t:,": true,
              },
              "ra)l[w7Fj": [
                false,
                "IrGW<C",
                -31272225.17189026,
                ""^1@m",
                null,
                "ucc&TrF%",
                true,
              ],
            },
            {
              "": [
                -1647135980,
                "&Y$aa",
                "",
                null,
              ],
              "!": [
                "",
                null,
              ],
              "*,+vX/": -1372154196,
              "Q": "-}s{",
              "y|P.t"": true,
              "{OQlF3z": -1587468009,
            },
            {
              "": null,
              ":G,BSO@u": "Y0ywrRpt",
              "nNw?WO": [
                null,
              ],
            },
            {
              "": 936653401.0455518,
              "(.;*": {},
              "12V _+": 957696727,
              "Uw[": null,
            },
            {
              "EdHO8": [
                null,
                1914386647.4176378,
              ],
              "v=YD3c+": [],
            },
            {
              "%k%E/.]0": null,
              "<8tv,^.>": "kJ6a$f&d8",
              "Ykvy": -2133546353,
            },
            {
              "<3S'@P": [
                1216993345,
                "",
                null,
                "v0,CM",
              ],
              "J*Oy?d6|)": {
                "": null,
              },
              "VzC%/OSy": "RMXSt",
              "]P/vo": -1473364711.762743,
              "aN55:L": 1160180941.7453866,
            },
            {
              "": -1838942424.8118095,
            },
            {},
          ]
        `)
    })

    it('random sample - object', () => {
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
            {
              "#k#'": -1373641555.943141,
              "9": {
                ",\`M]rxzIT": -706694403.2852044,
              },
            },
            {
              "": null,
              "8|w?Kn2": [
                -1470553105,
                108001456,
                643485404,
              ],
              "K+|b_": null,
              "MhBy]<(": true,
              "ZDW{S8m!=": "u#.SHMR{K",
              "[c6": {
                "": true,
                ")vT}ud": "Bb{/GZe,",
                "+": true,
                "2C7T": -1571690187.284359,
                "L": -501201442,
                "M#'": 637778531,
                "szL": false,
                "t:,": true,
              },
              "ra)l[w7Fj": [
                false,
                "IrGW<C",
                -31272225.17189026,
                ""^1@m",
                null,
                "ucc&TrF%",
                true,
              ],
            },
            {
              "": [
                -1647135980,
                "&Y$aa",
                "",
                null,
              ],
              "!": [
                "",
                null,
              ],
              "*,+vX/": -1372154196,
              "Q": "-}s{",
              "y|P.t"": true,
              "{OQlF3z": -1587468009,
            },
            {
              "": null,
              ":G,BSO@u": "Y0ywrRpt",
              "nNw?WO": [
                null,
              ],
            },
            {
              "": 936653401.0455518,
              "(.;*": {},
              "12V _+": 957696727,
              "Uw[": null,
            },
            {
              "EdHO8": [
                null,
                1914386647.4176378,
              ],
              "v=YD3c+": [],
            },
            {
              "%k%E/.]0": null,
              "<8tv,^.>": "kJ6a$f&d8",
              "Ykvy": -2133546353,
            },
            {
              "<3S'@P": [
                1216993345,
                "",
                null,
                "v0,CM",
              ],
              "J*Oy?d6|)": {
                "": null,
              },
              "VzC%/OSy": "RMXSt",
              "]P/vo": -1473364711.762743,
              "aN55:L": 1160180941.7453866,
            },
            {
              "": -1838942424.8118095,
            },
            {},
          ]
        `)
    })

    it('random sample - array', () => {
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
            [
              true,
              {},
            ],
            [
              -1507935664,
              1013760582,
              ",\`M]rxzIT",
            ],
            [
              958710102,
              {
                "]j": 1143959603.6837087,
                "w?Kn2uCD.": 108001456,
              },
              1931838474.8187099,
            ],
            [
              "'&\`RK",
              "b_bvZDW{S",
              1403384847,
            ],
            [
              "u#.SHMR{K",
              [
                true,
                null,
                false,
                -406153705,
                false,
                false,
                true,
                true,
              ],
              [
                -843789541.8325758,
                177346937,
                -2076532314.9177723,
                -2010454601.3085275,
              ],
            ],
            [
              1383532028.707796,
            ],
            [
              [
                false,
                "rF%Y,",
                564074426,
                true,
                false,
                "#_)vT}",
                null,
                true,
                null,
              ],
            ],
            [
              [
                523389373.3179898,
              ],
              {
                "M#'": 637778531,
              },
              -94283524,
              -501201442,
              1732258593.0578923,
              -1573288206,
              null,
            ],
            [
              [
                924404520.1016741,
                true,
                "7TR",
                "+",
                true,
                ""rM8*"",
                -1847842536.406973,
                true,
                false,
              ],
              "",
              [
                null,
                null,
                -1507302999.1529374,
                null,
                "/]*,",
                "X//0$S91!",
              ],
            ],
            [
              "",
              [
                null,
                112484133.99983549,
                null,
                -1234701493.9715767,
                null,
                -1587468009,
                ",L-}s",
              ],
            ],
          ]
        `)
    })

    it('random sample - value', () => {
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
            true,
            true,
            {},
            "0-9",
            {
              ",\`M]rxzIT": true,
            },
            958710102,
            {
              "]j": false,
              "w?Kn2uCD.": 108001456,
            },
            1931838474.8187099,
            null,
            -1736943443.7672043,
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
            forAll(json({ type: 'value' }), (j) => !equal(JSON.parse(JSON.stringify(j)), j), { seed: 42n })
        }).toThrowErrorMatchingInlineSnapshot(`
          [FalsifiedError: Counter example found after 1 tests (seed: 42n)
          Shrunk 2 time(s)
          Counter example:

          '']
        `)
    })

    it('parse stringify x != object x fails', () => {
        expect(() => {
            forAll(json({ type: 'value' }), (j) => !isObject(j), { seed: 42n })
        }).toThrowErrorMatchingInlineSnapshot(`
          [FalsifiedError: Counter example found after 2 tests (seed: 42n)
          Shrunk 1 time(s)
          Counter example:

          {}]
        `)
    })
})

describe('primitive', () => {
    it('random sample', () => {
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
            "򀋱鹃",
            null,
            -1806577501,
            true,
            -998293442.9723692,
            null,
            2070318677,
            813063012,
            "󮲯󿯚􅦂񶺮򗣖񼿻",
            true,
          ]
        `)
    })
})

describe('unknown', () => {
    it('random sample', () => {
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
            null,
            true,
            1312757734,
            -1806577501,
            "𨠊",
            false,
            2070318677,
            813063012.5310383,
            "󮲯󿯚􅦂񶺮򗣖񼿻",
            true,
          ]
        `)
    })
})
