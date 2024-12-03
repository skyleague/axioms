import { reverse } from './index.js'

import { allEqual } from '../../../iterator/index.js'
import { array, forAll, unknown } from '../../../random/index.js'
import { collect } from '../../index.js'

import { it } from 'vitest'

it('reverse reverse === identity', () => {
    forAll(array(unknown()), (xs) => allEqual(collect(reverse(reverse(xs))), xs))
})
