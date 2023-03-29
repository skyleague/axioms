import { last } from './index.js'

import { isNothing } from '../../guard/index.js'
import { forAll, array, unknown } from '../../random/index.js'

test('simple', () => {
    expect(last([1, 2, 3])).toMatchInlineSnapshot(`3`)
})

test('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(last(foobar())).toMatchInlineSnapshot(`"bar"`)
})

test('empty', () => {
    expect(last([])).toMatchInlineSnapshot(`Symbol((Nothing))`)
})

test('last in array, n > 0', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => xs[xs.length - 1] === last(xs))
})

test('last in array is Nothing, n == 0', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => isNothing(last(xs)))
})
