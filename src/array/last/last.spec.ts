import { last } from '.'

import { isNothing } from '../../guard'
import { forAll, array, unknown } from '../../random'

test('simple', () => {
    expect(last([1, 2, 3])).toMatchInlineSnapshot(`3`)
})

test('last in array, n > 0', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => xs[xs.length - 1] === last(xs))
})

test('last in array is Nothing, n == 0', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => isNothing(last(xs)))
})
