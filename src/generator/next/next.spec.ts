import { next } from '.'

import { repeat } from '..'
import { collect } from '../../array'
import { take } from '../../iterator'
import { forAll, tuple, array, unknown } from '../../random'
import { toTraverser, toGenerator } from '../../type'

describe('next', () => {
    test('take n X === right [X_1 + ... X_{n-1}] + left X_n', () => {
        forAll(tuple(array(unknown()), unknown()), ([xs, x]) => {
            const n = xs.length
            const it = toTraverser(toGenerator(xs, x))
            expect(
                collect(
                    take(
                        repeat(() => next(it)),
                        n
                    )
                )
            ).toEqual(
                xs.map((y) => ({
                    right: y,
                }))
            )
            expect(next(it)).toEqual({
                left: x,
            })
        })
    })
})
