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
            "0=7RY%{5": null,
            "Mq": "",
            "Px/EKy.": ".:$?+*v$",
            "jh": null,
          }
        `)
    })

    it('foo4', () => {
        const aobject = object({})
        expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`{}`)
    })
})
