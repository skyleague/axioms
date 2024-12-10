import { expect, it } from 'vitest'
import { forAll } from '../../random/arbitrary/forall/forall.js'
import { array } from '../../random/types/array/array.js'
import { unknown } from '../../random/types/complex/complex.js'
import { iterableFunc } from '../../random/types/iterable/iterable.js'
import { tuple } from '../../random/types/tuple/tuple.js'

it('xs === mappable(xs)', () => {
    forAll(tuple(array(unknown(), { minLength: 0, maxLength: 500 }), iterableFunc()), ([xs, fn]) => {
        expect(xs).toEqual(Iterator.from(fn(xs)).toArray())
    })
})

it('xs === mappable(mappable(xs))', () => {
    forAll(tuple(array(unknown(), { minLength: 0, maxLength: 500 }), iterableFunc(), iterableFunc()), ([xs, fn, fn2]) => {
        expect(xs).toEqual(Iterator.from(fn(fn2(xs))).toArray())
    })
})

it('xs !== [...xs, ...ys] for |ys| > 0', () => {
    forAll(
        tuple(array(unknown(), { minLength: 0, maxLength: 500 }), array(unknown(), { minLength: 1, maxLength: 10 })),
        ([xs, ys]) => {
            expect(xs).not.toEqual([...xs, ...ys])
        },
    )
})
