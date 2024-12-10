import { isBoolean } from '../../guard/is-boolean/is-boolean.js'
import { isNumber } from '../../guard/is-number/is-number.js'
import { isString } from '../../guard/is-string/is-string.js'
import { forAll } from '../../random/arbitrary/forall/forall.js'
import { xoroshiro128plus } from '../../random/rng/xoroshiro128plus/xoroshiro128plus.js'
import { array } from '../../random/types/array/array.js'
import { boolean } from '../../random/types/boolean/boolean.js'
import { float } from '../../random/types/float/float.js'
import { integer } from '../../random/types/integer/integer.js'
import { iterableFunc } from '../../random/types/iterable/iterable.js'
import { oneOf } from '../../random/types/one-of/one-of.js'
import { string } from '../../random/types/string/string.js'
import { tuple } from '../../random/types/tuple/tuple.js'
import { partition } from './partition.js'

import { expect, expectTypeOf, it } from 'vitest'

function* interleave<X, Y>(xs: X[], ys: Y[], seed: number) {
    const rng = xoroshiro128plus(BigInt(seed))

    for (let iX = 0, iY = 0; iX < xs.length || iY < ys.length; ) {
        if ((rng.sample() < 0.5 && iX < xs.length) || iY >= ys.length) {
            yield xs[iX++]
        } else {
            yield ys[iY++]
        }
    }
}

it('simple', () => {
    const xs = ['a', 0, 'b', 'c', 1, 'd', 2, 3]
    expect(partition(xs, isString)).toEqual([
        ['a', 'b', 'c', 'd'],
        [0, 1, 2, 3],
    ])
})

it('for [xs, ys] = partition zs, |zs| == |xs| + |ys|', () => {
    forAll(tuple(array(oneOf(float(), string(), boolean())), iterableFunc()), ([arr, f]) => {
        const zs = f(arr)
        for (const fn of [isString, isBoolean, isNumber]) {
            const [xs, ys] = partition(zs, fn)
            expect(arr.length).toEqual(xs.length + ys.length)
        }
    })
})

it('partition (interleave xs, ys), isX == [xs, ys]', () => {
    forAll(tuple(array(string()), array(float()), integer(), iterableFunc()), ([xs, ys, seed, f]) => {
        const zs = [...interleave(xs, ys, seed)]

        expect(zs.length).toEqual(xs.length + ys.length)
        const [Xs, Ys] = partition(f(zs), isString)
        expect(Xs).toEqual(xs)
        expect(Ys).toEqual(ys)
    })
})

it('partition is correctly typed', () => {
    expectTypeOf(partition([1, 2], (x) => x % 2 === 0)).toEqualTypeOf<[number[], number[]]>()
    expectTypeOf(partition([1, 2, '4'], isString)).toEqualTypeOf<[string[], number[]]>()
})
