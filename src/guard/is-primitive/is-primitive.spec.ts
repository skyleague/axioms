import { isPrimitive } from './index.js'

import { forAll, primitive } from '../../random/index.js'

import { it } from 'vitest'

it('primitive is primitive', () => {
    forAll(primitive(), (x) => isPrimitive(x))
})
