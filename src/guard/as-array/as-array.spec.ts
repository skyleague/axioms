import { asArray } from './as-array'

import { array, forAll, unknown } from '../../random'
import { isArray } from '../is-array'

test('primitive is converted', () => {
    forAll(unknown({ array: false }), (x) => isArray(asArray(x)))
})

test('array is untouched', () => {
    forAll(array(unknown()), (xs) => asArray(xs) === xs)
})
