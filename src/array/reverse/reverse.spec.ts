import { reverse } from './index.js'

import { allEqual } from '../../iterator/index.js'
import { forAll, array, unknown } from '../../random/index.js'
import { collect } from '../index.js'

test('reverse reverse === identity', () => {
    forAll(array(unknown()), (xs) => allEqual(collect(reverse(reverse(xs))), xs))
})
