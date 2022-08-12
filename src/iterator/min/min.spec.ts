import { min, minBy } from './min'

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

test('min xs <= all y', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(float(), { minLength: 1 }), array(string(), { minLength: 1 }))),
        <T extends ComparablePrimitive>([f, xs]: [(ys: T[]) => Mappable<T>, T[]]) => {
            const x = min(toTraversable(f(xs)))
            return isJust(x) && all(xs, (y) => x <= y)
        }
    )
})

test('min xs === Nothing, when |xs| === 0', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(float(), { maxLength: 0 }), array(string(), { maxLength: 0 }))),
        <T extends ComparablePrimitive>([f, xs]: [(ys: T[]) => Mappable<T>, T[]]) => min(toTraversable(f(xs))) === Nothing
    )
})

test('minBy toISOString, xs <= all y.toISOString()', () => {
    forAll(tuple(mappableFunc(), array(oneOf(date(), datetime()), { minLength: 1 })), ([f, xs]) => {
        const fxs = applicative(map(toTraversable(f(xs)), (x) => new Date(x)))
        const x = minBy(fxs, (d) => d.toISOString())
        return isJust(x) && all(fxs, (y) => x.toISOString() <= y.toISOString())
    })
})

test('minBy identity, xs === Nothing, when |xs| === 0', () => {
    forAll(
        tuple(mappableFunc(), oneOf(array(oneOf(float(), string()), { maxLength: 0 }))),
        ([f, xs]) => minBy(toTraversable(f(xs)), identity) === Nothing
    )
})
