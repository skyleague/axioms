import { maxLengthArbitrary } from './size.js'

import { constants } from '../../types/constants/constants.js'
import { constant } from '../../types/helper/helper.js'
import { forAll } from '../forall/forall.js'

import { it } from 'vitest'

it('check min max constraint - case 1`', () => {
    forAll([constants('xs', 's', 'm', 'l', 'xl'), constant(72)], ([size, min], context) => {
        const max = maxLengthArbitrary({ context, size, minLength: min })
        return max >= min
    })
})
