import { tail } from './index.js'

import { allEqual } from '../../iterator/index.js'
import { forAll, array, unknown } from '../../random/index.js'
import { toTraversable } from '../../type/index.js'
import { collect } from '../index.js'

import { expect, it } from 'vitest'

it('tail simple', () => {
    expect(collect(tail([1, 2, 3]))).toMatchInlineSnapshot(`
        [
          2,
          3,
        ]
    `)
})

it('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(collect(tail(foobar()))).toMatchInlineSnapshot(`
        [
          "bar",
        ]
    `)
})

it('tail xs === xs[1:]', () => {
    forAll(array(unknown()), (xs) => allEqual(toTraversable(tail(xs)), xs.slice(1)))
})
