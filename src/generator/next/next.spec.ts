import { next } from './index.js'

import { collect } from '../../array/index.js'
import { take } from '../../iterator/index.js'
import { forAll, tuple, array, unknown } from '../../random/index.js'
import { toTraverser, toGenerator } from '../../type/index.js'
import { counter, repeat } from '../index.js'

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
