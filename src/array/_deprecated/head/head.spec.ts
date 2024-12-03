import { head } from './index.js'

import { isNothing } from '../../../guard/index.js'
import { array, forAll, unknown } from '../../../random/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(head([1, 2, 3])).toMatchInlineSnapshot('1')
})

it('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(head(foobar())).toMatchInlineSnapshot(`"foo"`)
})

it('empty', () => {
    expect(head([])).toMatchInlineSnapshot('Symbol((Nothing))')
})

it('first in array, n > 0', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => {
        const [first] = xs
        return first === head(xs)
    })
})

it('first in array is Nothing, n == 0', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => isNothing(head(xs)))
})
