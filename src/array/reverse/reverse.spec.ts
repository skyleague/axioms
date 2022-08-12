import { reverse } from '.'

import { collect } from '..'
import { allEqual } from '../../iterator'
import { forAll, array, unknown } from '../../random'

test('reverse reverse === identity', () => {
    forAll(array(unknown()), (xs) => allEqual(collect(reverse(reverse(xs))), xs))
})
