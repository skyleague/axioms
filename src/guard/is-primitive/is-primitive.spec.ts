import { isPrimitive } from './index.js'

import { forAll, primitive } from '../../random/index.js'

test('primitive is primitive', () => {
    forAll(primitive(), (x) => isPrimitive(x))
})
