import { length } from './index.js'

import { isArray, isNothing } from '../../guard/index.js'
import { forAll, unknown, array, filterArbitrary } from '../../random/index.js'

test('only defined for arrays', () => {
    forAll(array(unknown()), (xs) => length(xs) === xs.length)
})

test('nothing for other', () => {
    forAll(
        filterArbitrary(unknown(), (x) => !isArray(x)),
        (xs) => isNothing(length(xs))
    )
})
