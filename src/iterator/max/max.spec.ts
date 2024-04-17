import { max, maxBy } from './max.js'

import type { ComparablePrimitive, Mappable } from '../../index.js'
import {
    Nothing,
    all,
    applicative,
    array,
    date,
    datetime,
    float,
    forAll,
    identity,
    isJust,
    map,
    oneOf,
    string,
    toTraversable,
    tuple,
} from '../../index.js'

import { expect, it } from 'vitest'
import { mappableFunc } from '../../random/types/mappable/mappable.js'

it('simple', () => {
    const n: number = max([1, 2, 3] as const)
    expect(n).toEqual(3)
})

it('max xs >= all y', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(float(), { minLength: 1 }), array(string(), { minLength: 1 }))),
        <T extends ComparablePrimitive>([f, xs]: [(ys: T[]) => Mappable<T>, T[]]) => {
            const x = max(toTraversable(f(xs)))
            return isJust(x) && all(xs, (y) => x >= y)
        },
    )
})

it('max xs === Nothing, when |xs| === 0', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(float(), { maxLength: 0 }), array(string(), { maxLength: 0 }))),
        <T extends ComparablePrimitive>([f, xs]: [(ys: T[]) => Mappable<T>, T[]]) => max(toTraversable(f(xs))) === Nothing,
    )
})

it('maxBy toISOString, xs >= all y.toISOString()', () => {
    forAll(tuple(mappableFunc(), array(oneOf(date(), datetime()), { minLength: 1 })), ([f, xs]) => {
        const fxs = applicative(map(toTraversable(f(xs)), (x) => new Date(x)))
        const x = maxBy(fxs, (d) => d.toISOString())
        return isJust(x) && all(fxs, (y) => x.toISOString() >= y.toISOString())
    })
})

it('maxBy identity, xs === Nothing, when |xs| === 0', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(oneOf(float(), string()), { maxLength: 0 }))),
        ([f, xs]) => maxBy(toTraversable(f(xs)), identity) === Nothing,
    )
})
