import { next } from '.'

import { counter, repeat } from '..'
import { collect } from '../../array'
import { take } from '../../iterator'
import { forAll, tuple, array, unknown } from '../../random'
import { toTraverser, toGenerator } from '../../type'

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

test('simple', () => {
    expect(next(counter())).toMatchInlineSnapshot(`
        {
          "right": 0,
        }
    `)
})

test('array', () => {
    expect(next(toTraverser([1234, 456]))).toMatchInlineSnapshot(`
        {
          "right": 1234,
        }
    `)
})

test('done', () => {
    function* done() {
        yield 1
        return 'done'
    }
    const it = toTraverser(done())
    expect(next(it)).toMatchInlineSnapshot(`
        {
          "right": 1,
        }
    `)
    expect(next(it)).toMatchInlineSnapshot(`
        {
          "left": "done",
        }
    `)
})
