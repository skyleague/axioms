import { toTraversable } from '.'

import { allEqual, array, float, forAll, mappableFunc, oneOf, string, tuple } from '../..'

describe('toTraversable', () => {
    test('should be able to work with union of arrays', () => {
        forAll(tuple(mappableFunc(), oneOf(array(string()), array(float()))), ([f, xs]) => {
            return allEqual(xs, toTraversable(f(xs)))
        })
    })
    test('should be able to work with array of unions', () => {
        forAll(tuple(mappableFunc(), array(oneOf(string(), float()))), ([f, xs]) => {
            return allEqual(xs, toTraversable(f(xs)))
        })
    })
})
