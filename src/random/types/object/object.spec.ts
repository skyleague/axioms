import { object } from './object.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { omitUndefined } from '../../../object/omit/omit.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { forAll } from '../../arbitrary/forall/forall.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { json } from '../complex/index.js'
import { constant, optional } from '../helper/helper.js'
import { integer } from '../integer/index.js'
import { oneOf } from '../one-of/index.js'
import { utf16 } from '../string/index.js'

import { expect, it } from 'vitest'
import { constants } from '../constants/constants.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = object({ foo: integer() })
    expect(
        collect(
            take(
                repeat(() => aint.sample(ctx)),
                10,
            ),
        ),
    ).toMatchInlineSnapshot(`
          [
            {
              "foo": 218084956,
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
              "foo": 1312757735,
            },
            {
              "foo": -1984378058,
            },
            {
              "foo": -1806577501,
            },
            {
              "foo": -468159076,
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
    expect(aobject.random(arbitraryContext({ rng: xoroshiro128plus(42n) }))).toMatchInlineSnapshot(`
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
    expect(aobject.random(arbitraryContext({ rng: xoroshiro128plus(42n) }))).toMatchInlineSnapshot(`
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
    expect(aobject.value(arbitraryContext({ rng: xoroshiro128plus(48n) })).value).toMatchInlineSnapshot(`
          {
            "": false,
            ",V^?/": false,
            "6+%*o/:$?+": "=&Ul",
            "Mr": true,
            "Py/EKz.;": true,
            "_D2XXs": true,
            "h)e}G0JB": true,
            "is0=7SZ%": false,
            "jf*": true,
            "w": true,
          }
        `)
})

it('foo4', () => {
    const aobject = object({})
    expect(aobject.random(arbitraryContext({ rng: xoroshiro128plus(42n) }))).toMatchInlineSnapshot('{}')
})

it('shrinks down on all properties', () => {
    expect(() => {
        forAll(
            object({
                foo1: optional(integer(), { symbol: undefined }),
                foo2: optional(integer(), { symbol: undefined }),
                foo3: optional(integer(), { symbol: undefined }),
                foo4: optional(integer(), { symbol: undefined }),
                foo5: optional(integer(), { symbol: undefined }),
                foo6: optional(integer(), { symbol: undefined }),
                foo7: optional(integer(), { symbol: undefined }),
            }).map(omitUndefined),
            (i) => Object.values(i).every((x) => x === undefined),
            { seed: 42n, timeout: false },
        )
    }).toThrowErrorMatchingInlineSnapshot(`
          [AssertionError: Counter example found after 2 tests (seed: 42n)
          Shrunk 1 time(s)
          Counter example:

          { foo1: 0 }

          ]
        `)
})

it('cardinality', () => {
    expect(
        object({ foo: constant('foo'), bar: constant('bar') }).supremumCardinality?.(arbitraryContext()),
    ).toMatchInlineSnapshot('1')
    expect(
        object({ foo: constants('foo', 'bar'), bar: constant('bar') }).supremumCardinality?.(arbitraryContext()),
    ).toMatchInlineSnapshot('2')
    expect(
        object({ foo: constants('foo', 'bar'), bar: constants('foo', 'bar') }).supremumCardinality?.(arbitraryContext()),
    ).toMatchInlineSnapshot('4')
})
