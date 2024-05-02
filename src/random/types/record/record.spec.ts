import { record } from './record.js'

import { collect } from '../../../array/index.js'
import { repeat } from '../../../generator/index.js'
import { take } from '../../../iterator/index.js'
import { arbitraryContext } from '../../arbitrary/context/context.js'
import { xoroshiro128plus } from '../../rng/index.js'
import { string } from '../string/index.js'

import { expect, it } from 'vitest'
import { constant } from '../helper/helper.js'

it('random sample', () => {
    const ctx = arbitraryContext({ rng: xoroshiro128plus(1638968569864n) })
    const aint = record(string())
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
              "#'E1.9e+": "z^<)",
              ",aM^sy{ITK": "'&aRK+",
              "1dg": "b\`cvZDX|T8",
              "Ko2": "R|Lws",
              "L#": "CD.7Q5]kNh",
              "}x": "!>!xv#.TH",
            },
            {
              "": "]1M",
              "#_1@n": "DE",
              ",uvdd&TsF%": ":,[;Et{Mc",
              "CSN": "f-?N#'",
              "i#_JsGW": "&mBb|/H",
              "m": "-D[d6g",
              "x7Fjwc": ")a#\`)wU~v",
            },
            {
              "": "X001$S91!z",
              "#&raz}P": "h|PQmG4{8,",
              ",/+YM": "",
              "2D7T": "t",
              "M8+"Q&Z$a": " "",
              "^": "/]*,+",
            },
            {
              ",L-~s": "S=YoNx?WP{",
            },
            {
              "s:H,CSO@v": "",
            },
            {
              "": ">",
              "$a7H\\12W ": "=o%k%",
              "+:dI(/<": "/.]0",
              "1zxsSq": "~Vy",
              "D3d+w#": "Zkwz8",
              "EeHO8x": "",
              "\`53gw>": "J7b$g&e9",
              "dAUx": "}",
              "q": "r<8uw,^",
            },
            {
              "": "w",
              "0Rw0-CN[bN": "E.|K*Pz?e",
              "\`<3T'@": "5:",
              "vMBj$": "@iP^Q",
            },
            {
              ")g) mmW{D&": "z%XRM",
              "P": "Tu.-'D",
            },
            {},
            {
              "": "r;",
            },
          ]
        `)
})

it('cardinality', () => {
    expect(record([constant('foo'), constant('bar')]).supremumCardinality?.(arbitraryContext())).toMatchInlineSnapshot(
        'undefined',
    )
})
