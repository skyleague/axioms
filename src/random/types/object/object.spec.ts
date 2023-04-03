import { object } from './object.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { json } from '../complex/index.js'
import { integer } from '../integer/index.js'
import { oneOf } from '../one-of/index.js'
import { utf16 } from '../string/index.js'

describe('object', () => {
    test('random sample', () => {
        const ctx = { rng: xoroshiro128plus(1638968569864n) }
        const aint = object({ foo: integer() })
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
                "foo": 921604357,
              },
              {
                "foo": -1817301679,
              },
              {
                "foo": -1226565061,
              },
              {
                "foo": 511147728,
              },
              {
                "foo": -1723568135,
              },
              {
                "foo": 552579827,
              },
              {
                "foo": -207009089,
              },
              {
                "foo": -1857613535,
              },
              {
                "foo": 15946192,
              },
              {
                "foo": -1697006873,
              },
            ]
        `)
    })

    test('foo', () => {
        const aobject = object({
            foo: oneOf(utf16(), integer()),
            bar: utf16(),
        })
        expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`
                    {
                      "bar": "뢙⧪ࠍď",
                      "foo": 1678974498,
                    }
            `)
    })

    test('foo2', () => {
        const aobject = object({
            foo: oneOf(utf16(), integer()),
            bar: object({
                foo: oneOf(utf16(), integer()),
                bar: utf16(),
            }),
        })
        expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`
                    {
                      "bar": {
                        "bar": "",
                        "foo": "⧪ࠍď朔痭໠銌",
                      },
                      "foo": 1678974498,
                    }
            `)
    })

    test('foo3', () => {
        const aobject = json()
        expect(aobject.value({ rng: xoroshiro128plus(48n) }).value).toMatchInlineSnapshot(`
            {
              "&"<9#w<6": null,
              "@\\Q*cM]": "=m",
              "BR": [
                " eDZl3zqf",
                null,
                false,
                -1220394099.677001,
                -1465129464,
                null,
                -1068526350.6912618,
                false,
                "rQ9Ro",
              ],
              "D6Ss@CGln": {
                ":PNH>:": "",
                "jS:#%>]u": 1267711513.3051472,
                "}X": false,
              },
              "F)O?Fb[m": [
                -1883886852,
                "la",
              ],
              "NW": [
                -406554418,
                false,
                502462132,
                null,
                false,
              ],
              "P;2(}c": null,
              "kWb^u": -1613173730.4950776,
            }
        `)
    })

    test('foo4', () => {
        const aobject = object({})
        expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`{}`)
    })
})
