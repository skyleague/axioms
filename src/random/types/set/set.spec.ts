import { set, subsuper } from './set'

import { collect } from '../../../array/collect'
import { unique } from '../../../iterator/unique'
import { difference } from '../../../set/difference'
import { isSuperset } from '../../../set/is-superset/is-super'
import { forAll } from '../../arbitrary/forall'
import { unknown } from '../complex'
import { integer } from '../integer'

describe('set', () => {
    test('all unique - number', () => {
        const size = 1000
        forAll(set(integer({ min: 0, max: size })), (xs) => xs.length === collect(unique(xs)).length, { seed: 1638968569864n })
    })

    test('always larger than minsize', () => {
        const size = 3
        forAll(set(integer(), { minLength: size, maxLength: 100 }), (xs) => {
            return xs.length >= size
        })
    })
})

test('always larger than minsize', () => {
    const size = 3
    forAll(set(integer(), { minLength: size, maxLength: 100 }), (xs) => {
        return xs.length >= size
    })
})

describe('subsuper', () => {
    test('S U X, S C X', () => {
        forAll(subsuper(unknown()), ([sub, superset]) => isSuperset(superset, sub))
    })

    test('S U X, ~ X C S \\ X', () => {
        forAll(subsuper(unknown()), ([sub, superset]) => {
            const complement = [...difference(superset, sub)]
            return complement.length === 0 || !isSuperset(sub, complement)
        })
    })
})
