import { head } from './index.js'

import { isNothing } from '../../guard/index.js'
import { forAll, array, unknown } from '../../random/index.js'

test('simple', () => {
    expect(head([1, 2, 3])).toMatchInlineSnapshot(`1`)
})

test('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(head(foobar())).toMatchInlineSnapshot(`"foo"`)
})

test('empty', () => {
    expect(head([])).toMatchInlineSnapshot(`Symbol((Nothing))`)
})

test('first in array, n > 0', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => {
        const [first] = xs
        return first === head(xs)
    })
})

test('first in array is Nothing, n == 0', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => isNothing(head(xs)))
})
