import { partition } from './partition.js'

import type { Mappable } from '../../index.js'
import {
    array,
    boolean,
    float,
    forAll,
    integer,
    isBoolean,
    isNumber,
    isString,
    mappableFunc,
    oneOf,
    string,
    toTraversable,
    tuple,
    xoroshiro128plus,
} from '../../index.js'

import { expect, it } from 'vitest'

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
    forAll(
        tuple(mappableFunc(), array(oneOf(float(), string(), boolean()))),
        ([f, zs]: [<T>(us: T[]) => Mappable<T>, (boolean | number | string)[]]) => {
            for (const fn of [isString, isBoolean, isNumber]) {
                const [xs, ys] = partition(toTraversable(f(zs)), fn as <T>(x: unknown) => x is T)
                expect(zs.length).toEqual(xs.length + ys.length)
            }
        }
    )
})

it('partition (interleave xs, ys), isX == [xs, ys]', () => {
    forAll(
        tuple(mappableFunc(), array(string()), array(float()), integer()),
        ([f, xs, ys, seed]: [<T>(us: T[]) => Mappable<T>, string[], number[], number]) => {
            const zs = [...interleave(xs, ys, seed)]

            expect(zs.length).toEqual(xs.length + ys.length)
            const [Xs, Ys] = partition(toTraversable(f(zs)), isString)
            expect(Xs).toEqual(xs)
            expect(Ys).toEqual(ys)
        }
    )
})
