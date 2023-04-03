import { asArray } from './as-array.js'

import { array, forAll, unknown } from '../../random/index.js'
import { isArray } from '../is-array/index.js'

test('primitive is converted', () => {
    forAll(unknown({ array: false }), (x) => isArray(asArray(x)))
})

test('array is untouched', () => {
    forAll(array(unknown()), (xs) => asArray(xs) === xs)
})
