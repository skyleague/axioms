import { it } from 'vitest'
import { forAll } from '../../random/arbitrary/forall/forall.js'
import { array } from '../../random/types/array/array.js'
import { unknown } from '../../random/types/complex/complex.js'
import { mappableFunc } from '../../random/types/mappable/mappable.js'
import { tuple } from '../../random/types/tuple/tuple.js'
import { toTraversable } from '../../type/_deprecated/traversable/traversable.js'
import { allEqual } from './equal.js'

it('xs === mappable(xs)', () => {
    forAll(
        tuple(array(unknown(), { minLength: 0, maxLength: 500 }), mappableFunc()),
        ([xs, fn]) => allEqual(xs, toTraversable(fn(xs))),
        { tests: 20 },
    )
})

it('xs === mappable(mappable(xs))', () => {
    forAll(
        tuple(array(unknown(), { minLength: 0, maxLength: 500 }), mappableFunc(), mappableFunc()),
        ([xs, fn, fn2]) => allEqual(xs, toTraversable(fn(fn2(xs)))),
        { tests: 20 },
    )
})
it('xs !== [...xs, ...ys] for |ys| > 0', () => {
    forAll(
        tuple(array(unknown(), { minLength: 0, maxLength: 500 }), array(unknown(), { minLength: 1, maxLength: 10 })),
        ([xs, ys]) => !allEqual(xs, [...xs, ...ys]),
        { tests: 20 },
    )
})
