import { object, oneOf, utf16, integer, json } from '.'

import { xoroshiro128plus } from '../rng'

test('foo', () => {
    const aobject = object({
        foo: oneOf(utf16(), integer()),
        bar: utf16(),
    })
    expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`
        Object {
          "bar": "游",
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
        Object {
          "bar": Object {
            "bar": "⧪",
            "foo": "뢙",
          },
          "foo": 1678974498,
        }
    `)
})

test('foo3', () => {
    const aobject = json()
    expect(aobject.value({ rng: xoroshiro128plus(48n) }).value).toMatchInlineSnapshot(`
        Array [
          Array [
            187319221,
            Array [
              -356888576,
              null,
              null,
            ],
            Object {
              ":PNH>:": "ᣌ",
              "jS:#%>]u": 1267711513.3051472,
              "}X": false,
            },
          ],
          -45410478,
          null,
          Array [
            -406554418,
            Object {
              "": true,
              "#w": -1129189339,
              "/TrQ9Roq&": "乽",
              "4<.pF": 748002190,
              "R{z": "﷾",
              "Yp_": true,
              "l3zqfx": false,
              "pF)O?F": false,
              "x<?%.7la": true,
            },
            null,
            true,
            Object {
              "": null,
              "*3=mSk": 910395653.0842972,
              "cYWlme,lk": true,
              "u>+ZP;": "ᝉ",
            },
          ],
          "珜",
          -428571307.9568472,
          Array [
            null,
          ],
          Object {
            "-f<K": true,
            "3 {B{": true,
            "9@OphK0": 1335966806.542492,
            "\\\\T\`H{": true,
            "dWZ\\"9|": Object {
              "\`)Qh": true,
              "yG'yQHJO%": true,
            },
            "e\`": Object {
              "9NYQ5Z": null,
              "Dwbdf4F%j": false,
              "G": 359924347.15237284,
              "G4u2};": 2067471207.244885,
              "Sv\\\\J5bvn": true,
              "Xg,vg6K*": null,
              "cR[h5pVD.": "鲝",
              "lv%o!0": 400290437.29981756,
            },
          },
        ]
    `)
})

test('foo4', () => {
    const aobject = object({})
    expect(aobject.random({ rng: xoroshiro128plus(42n) })).toMatchInlineSnapshot(`Object {}`)
})
