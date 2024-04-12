import { next } from './index.js'

import { collect } from '../../array/index.js'
import { take } from '../../iterator/index.js'
import { array, forAll, tuple, unknown } from '../../random/index.js'
import { toGenerator, toTraverser } from '../../type/index.js'
import { counter, repeat } from '../index.js'

import { expect, it } from 'vitest'

it('take n X === right [X_1 + ... X_{n-1}] + left X_n', () => {
    forAll(tuple(array(unknown()), unknown()), ([xs, x]) => {
        const n = xs.length
        const iterator = toTraverser(toGenerator(xs, x))
        expect(
            collect(
                take(
                    repeat(() => next(iterator)),
                    n,
                ),
            ),
        ).toEqual(
            xs.map((y) => ({
                right: y,
            })),
        )
        expect(next(iterator)).toEqual({
            left: x,
        })
    })
})

it('simple', () => {
    expect(next(counter())).toMatchInlineSnapshot(`
        {
          "right": 0,
        }
    `)
})

it('array', () => {
    expect(next(toTraverser([1234, 456]))).toMatchInlineSnapshot(`
        {
          "right": 1234,
        }
    `)
})

it('done', () => {
    function* done() {
        yield 1
        return 'done'
    }
    const iterator = toTraverser(done())
    expect(next(iterator)).toMatchInlineSnapshot(`
        {
          "right": 1,
        }
    `)
    expect(next(iterator)).toMatchInlineSnapshot(`
        {
          "left": "done",
        }
    `)
})
