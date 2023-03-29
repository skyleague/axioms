import { peekable } from './index.js'

import { collect, zip } from '../../array/index.js'
import { isRight } from '../../guard/is-right/index.js'
import { take, map, concat } from '../../iterator/index.js'
import { forAll, array, unknown, tuple } from '../../random/index.js'
import { toGenerator } from '../../type/index.js'
import { repeat, next, range } from '../index.js'

test('peekable xs === xs', () => {
    forAll(array(unknown()), (xs) => {
        const n = xs.length
        expect(collect(take(peekable(xs), n))).toEqual(xs)
    })
})

test('has +1 lookahead', () => {
    forAll(tuple(array(unknown()), unknown()), ([xs, x]) => {
        const n = xs.length
        const it = peekable(toGenerator(xs, x))
        expect(
            collect(
                take(
                    repeat(() => {
                        return [it.peek(), next(it)]
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
        expect(it.peek()).toEqual({ left: x })
        expect(next(it)).toEqual({ left: x })
        expect(it.peek()).toEqual({ left: x })
    })
})

test('simple', () => {
    const values = []
    const iterator = peekable(range(3))
    let it = next(iterator)
    while (isRight(it)) {
        values.push([it, iterator.peek()])
        it = next(iterator)
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
