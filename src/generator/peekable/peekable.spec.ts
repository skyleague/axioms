import { peekable } from '.'

import { repeat, next } from '..'
import { collect, zip } from '../../array'
import { take, map, concat } from '../../iterator'
import { forAll, array, unknown, tuple } from '../../random'
import { toGenerator } from '../../type'

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
