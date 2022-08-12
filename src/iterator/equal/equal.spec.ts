import { allEqual } from '.'

import { array, forAll, mappableFunc, toTraversable, tuple, unknown } from '../..'

test('xs === mappable(xs)', () => {
    forAll(
        tuple(array(unknown(), { minLength: 0, maxLength: 500 }), mappableFunc()),
        ([xs, fn]) => allEqual(xs, toTraversable(fn(xs))),
        { tests: 20 }
    )
})

test('xs === mappable(mappable(xs))', () => {
    forAll(
        tuple(array(unknown(), { minLength: 0, maxLength: 500 }), mappableFunc(), mappableFunc()),
        ([xs, fn, fn2]) => allEqual(xs, toTraversable(fn(fn2(xs)))),
        { tests: 20 }
    )
})
test('xs !== [...xs, ...ys] for |ys| > 0', () => {
    forAll(
        tuple(array(unknown(), { minLength: 0, maxLength: 500 }), array(unknown(), { minLength: 1, maxLength: 10 })),
        ([xs, ys]) => !allEqual(xs, [...xs, ...ys]),
        { tests: 20 }
    )
})
