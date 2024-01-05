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
            },
            {
              "+|,\`M]r": [
                245579087.83319187,
                -706694403.2852044,
                "f8|w?Kn",
                "CD.7Q4]jM",
              ],
            },
            {
              "]<(U'&\`RK": "b_bvZDW{S",
            },
            {
              "": [
                true,
                null,
                false,
                -406153705,
              ],
              "!wu": {
                ""^1@m": "#_)vT}",
                ",tucc&TrF": null,
                "<CRN!": null,
                "\\i#^IrG": ",C[c6f",
              },
              "MR{K": {
                "{/GZe,?": -1983993899.802557,
              },
              "S": {},
            },
            {
              "1L3DEt": -1573288206,
            },
            {
              "szL": {
                ",.+XL": false,
                "2C7T": "M8*"Q&Y$",
                "]": "",
              },
            },
            {
              "+": [
                null,
                112484133.99983549,
                null,
              ],
              "X//0$S91!": -1234701493.9715767,
              "|P.t"L/]*": [
                "",
              ],
            },
            {
              ".": true,
            },
            {},
            {
              "/pr:G,BSO": null,
              "0ywrRp": null,
              "S=YnNw?WO": [],
              "u$p": -309658578,
            },
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
            },
            {
              "+|,\`M]r": [
                245579087.83319187,
                -706694403.2852044,
                "f8|w?Kn",
                "CD.7Q4]jM",
              ],
            },
            {
              "]<(U'&\`RK": "b_bvZDW{S",
            },
            {
              "": [
                true,
                null,
                false,
                -406153705,
              ],
              "!wu": {
                ""^1@m": "#_)vT}",
                ",tucc&TrF": null,
                "<CRN!": null,
                "\\i#^IrG": ",C[c6f",
              },
              "MR{K": {
                "{/GZe,?": -1983993899.802557,
              },
              "S": {},
            },
            {
              "1L3DEt": -1573288206,
            },
            {
              "szL": {
                ",.+XL": false,
                "2C7T": "M8*"Q&Y$",
                "]": "",
              },
            },
            {
              "+": [
                null,
                112484133.99983549,
                null,
              ],
              "X//0$S91!": -1234701493.9715767,
              "|P.t"L/]*": [
                "",
              ],
            },
            {
              ".": true,
            },
            {},
            {
              "/pr:G,BSO": null,
              "0ywrRp": null,
              "S=YnNw?WO": [],
              "u$p": -309658578,
            },
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
            ],
            [],
            [
              -1507935664,
            ],
            [
              ",\`M]rxzIT",
              true,
              958710102,
            ],
            [
              [
                -171808136,
                null,
                "CD.7Q4]jM",
                true,
              ],
            ],
            [
              -1736943443.7672043,
              true,
              "RK+|b_",
            ],
            [
              null,
              400714534.43508816,
              [
                1403384847,
                "!wu",
              ],
              "S",
            ],
            [
              false,
              false,
            ],
            [
              "[w7Fjvb\\",
              {},
              null,
            ],
            [
              367591765.47046185,
              -520711974.63190174,
              true,
              ""^1@m",
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
            {},
            [],
            null,
            false,
            [
              [
                -173710798.9892583,
                -1344762792,
              ],
              {
                "CD.7Q4]jM": true,
                "Kn2": null,
                "|w": true,
              },
              "'&\`RK",
              "b_bvZDW{S",
            ],
            1403384847,
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
          [FalsifiedError: Counter example found after 1 tests (seed: 42n)
          Shrunk 2 time(s)
          Counter example:

          '']
        `)
    })

    it('parse stringify x != object x fails', () => {
        expect(() => {
            forAll(json({ type: 'value' }), (j) => !isObject(j), { seed: 42n, timeout: false })
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
