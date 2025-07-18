import { it } from 'vitest'

import { array, forAll, unknown } from '../../random/index.js'
import { isArray } from '../is-array/index.js'
import { asArray } from './as-array.js'

it('primitive is converted', () => {
    forAll(unknown({ array: false }), (x) => isArray(asArray(x)))
})

it('array is untouched', () => {
    forAll(array(unknown()), (xs) => asArray(xs) === xs)
})
