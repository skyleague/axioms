import { object } from './object.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { json } from '../complex/index.js'
import { integer } from '../integer/index.js'
import { oneOf } from '../one-of/index.js'
import { utf16 } from '../string/index.js'

import { expect, describe, it } from 'vitest'

describe('object', () => {
    it('random sample', () => {
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
              "foo": 218084955,
            },
            {
              "foo": -987316205,
            },
            {
              "foo": -123414345,
            },
            {
              "foo": -1991294022,
            },
            {
              "foo": 1312757734,
            },
            {
              "foo": -1984378058,
            },
            {
              "foo": -1806577501,
            },
            {
              "foo": -468159077,
            },
            {
              "foo": -1373641556,
            },
            {
              "foo": -1507935664,
            },
          ]
        `)
    })

    it('foo', () => {
        const aobject = object({
            foo: oneOf(utf16(), integer()),
            bar: utf16(),
        })
        expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`
          {
            "bar": "䈞",
            "foo": "",
          }
        `)
    })

    it('foo2', () => {
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
              "bar": "脄釜",
              "foo": "࿘ᤤ",
            },
            "foo": "",
          }
        `)
    })

    it('foo3', () => {
        const aobject = json()
        expect(aobject.value({ rng: xoroshiro128plus(48n) }).value).toMatchInlineSnapshot(`
          {
            "": "<P\\E",
            "&Tk": true,
            "+.*": -891432155.5806098,
            "Mq": {
              "": null,
              "+%": ".:$?+*v$",
              "/EKy.:jhr": "7RY",
              "^?/?j": true,
              "_C2WXs": -1580245231.121954,
            },
            "TF@(*!": null,
            "X": [
              null,
              "OiL@DXR",
              630536136.5827513,
              null,
              true,
              -1261235195.6625767,
              false,
            ],
            "_*&hda\\m": {
              "": "uQFa";",
              "A#'/64": null,
              "B%GYI)": null,
              "S[jBw": true,
              "WW": false,
              "mF]vEV": 1620438824.1357212,
              "uOf": -361728656.05956936,
              "z8IJDm@_t": -2049062118.5948439,
            },
            "g)d|G0J": -1316087918.5038595,
            "j0": -626812828.9789438,
          }
        `)
    })

    it('foo4', () => {
        const aobject = object({})
        expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`{}`)
    })
})
