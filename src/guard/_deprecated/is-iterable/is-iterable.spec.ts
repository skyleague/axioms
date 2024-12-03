import { isIterable } from './index.js'

import { array, forAll, unknown } from '../../../random/index.js'
import { isArray } from '../../index.js'

import { expect, it } from 'vitest'

it('array is iterable', () => {
    forAll(array(unknown()), (xs) => isArray(xs))
})

it('unknown is not iterable', () => {
    forAll(unknown({ string: false, array: false }), (xs) => !isIterable(xs))
})

it('inferrence', () => {
    const xs: number[] | number = [1, 2, 3] as unknown as number[] | number
    if (isIterable(xs)) {
        expect(xs[0]! * 2).toBe(2)
    }
})
