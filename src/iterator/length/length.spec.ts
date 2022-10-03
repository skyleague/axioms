import { length } from '.'

import { isArray, isNothing } from '../../guard'
import { forAll, unknown, array, filterArbitrary } from '../../random'

test('only defined for arrays', () => {
    forAll(array(unknown()), (xs) => length(xs) === xs.length)
})

test('nothing for other', () => {
    forAll(
        filterArbitrary(unknown(), (x) => !isArray(x)),
        (xs) => isNothing(length(xs))
    )
})
