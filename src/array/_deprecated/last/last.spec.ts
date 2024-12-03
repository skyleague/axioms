import { last } from './index.js'

import { isNothing } from '../../../guard/index.js'
import { array, forAll, unknown } from '../../../random/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(last([1, 2, 3])).toMatchInlineSnapshot('3')
})

it('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(last(foobar())).toMatchInlineSnapshot(`"bar"`)
})

it('empty', () => {
    expect(last([])).toMatchInlineSnapshot('Symbol((Nothing))')
})

it('last in array, n > 0', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => xs[xs.length - 1] === last(xs))
})

it('last in array is Nothing, n == 0', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => isNothing(last(xs)))
})
