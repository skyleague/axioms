import { length } from './index.js'

import { isArray, isNothing } from '../../../guard/index.js'
import { array, filterArbitrary, forAll, unknown } from '../../../random/index.js'

import { it } from 'vitest'

it('only defined for arrays', () => {
    forAll(array(unknown()), (xs) => length(xs) === xs.length)
})

it('nothing for other', () => {
    forAll(
        filterArbitrary(unknown(), (x) => !isArray(x)),
        (xs) => isNothing(length(xs)),
    )
})
