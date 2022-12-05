import { max, maxBy } from './max'

import type { ComparablePrimitive, Mappable } from '../..'
import {
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
    mappableFunc,
    Nothing,
    oneOf,
    string,
    toTraversable,
    tuple,
} from '../..'

test('simple', () => {
    const n: number = max([1, 2, 3] as const)
    expect(n).toEqual(3)
})

test('max xs >= all y', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(float(), { minLength: 1 }), array(string(), { minLength: 1 }))),
        <T extends ComparablePrimitive>([f, xs]: [(ys: T[]) => Mappable<T>, T[]]) => {
            const x = max(toTraversable(f(xs)))
            return isJust(x) && all(xs, (y) => x >= y)
        }
    )
})

test('max xs === Nothing, when |xs| === 0', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(float(), { maxLength: 0 }), array(string(), { maxLength: 0 }))),
        <T extends ComparablePrimitive>([f, xs]: [(ys: T[]) => Mappable<T>, T[]]) => max(toTraversable(f(xs))) === Nothing
    )
})

test('maxBy toISOString, xs >= all y.toISOString()', () => {
    forAll(tuple(mappableFunc(), array(oneOf(date(), datetime()), { minLength: 1 })), ([f, xs]) => {
        const fxs = applicative(map(toTraversable(f(xs)), (x) => new Date(x)))
        const x = maxBy(fxs, (d) => d.toISOString())
        return isJust(x) && all(fxs, (y) => x.toISOString() >= y.toISOString())
    })
})

test('maxBy identity, xs === Nothing, when |xs| === 0', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(oneOf(float(), string()), { maxLength: 0 }))),
        ([f, xs]) => maxBy(toTraversable(f(xs)), identity) === Nothing
    )
})
