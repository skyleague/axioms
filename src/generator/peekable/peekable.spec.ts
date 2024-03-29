import { peekable } from './index.js'

import { collect, zip } from '../../array/index.js'
import { isRight } from '../../guard/is-right/index.js'
import { take, map, concat } from '../../iterator/index.js'
import { forAll, array, unknown, tuple } from '../../random/index.js'
import { toGenerator } from '../../type/index.js'
import { repeat, next, range } from '../index.js'

import { expect, it } from 'vitest'

it('peekable xs === xs', () => {
    forAll(array(unknown()), (xs) => {
        const n = xs.length
        expect(collect(take(peekable(xs), n))).toEqual(xs)
    })
})

it('has +1 lookahead', () => {
    forAll(tuple(array(unknown()), unknown()), ([xs, x]) => {
        const n = xs.length
        const iterator = peekable(toGenerator(xs, x))
        expect(
            collect(
                take(
                    repeat(() => {
                        return [iterator.peek(), next(iterator)]
                    }),
                    n
                )
            )
        ).toEqual(
            collect(
                map(zip(xs, concat(xs, [undefined])), ([y, xp]) => [
                    {
                        right: y,
                    },
                    { right: xp },
                ])
            )
        )
        expect(iterator.peek()).toEqual({ left: x })
        expect(next(iterator)).toEqual({ left: x })
        expect(iterator.peek()).toEqual({ left: x })
    })
})

it('simple', () => {
    const values = []
    const iterator = peekable(range(3))
    let its = next(iterator)
    while (isRight(its)) {
        values.push([its, iterator.peek()])
        its = next(iterator)
    }
    expect(values).toMatchInlineSnapshot(`
        [
          [
            {
              "right": 0,
            },
            {
              "right": 1,
            },
          ],
          [
            {
              "right": 1,
            },
            {
              "right": 2,
            },
          ],
          [
            {
              "right": 2,
            },
            {
              "left": undefined,
            },
          ],
        ]
    `)
})
