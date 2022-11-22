import { object, oneOf, utf16, integer, json } from '.'

import { xoroshiro128plus } from '../rng'

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
        [
          [
            187319221,
            [
              -356888576,
              null,
              null,
            ],
            {
              ":PNH>:": "",
              "jS:#%>]u": 1267711513.3051472,
              "}X": false,
            },
          ],
          -45410478,
          null,
          [
            -406554418,
            {
              ")O?F": false,
              "6_": null,
              "9Roq&": "9#w",
              "Q*cM]*": -799235957,
              "R{z": " eDZl3zqf",
              "T": null,
              "Yp_": true,
              "\\cX4<.pF7": false,
              "x<?%.7la": true,
            },
            {
              "": null,
              "G)p J;E": null,
              "Wb^u>+ZP": -1301672163,
              "X": null,
              "YWlme,l": null,
            },
            null,
            null,
          ],
          null,
          false,
          false,
          true,
        ]
    `)
})

test('foo4', () => {
    const aobject = object({})
    expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`{}`)
})
