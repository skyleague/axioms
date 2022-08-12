import { isPrimitive } from '.'

import { forAll, primitive } from '../../random'

test('primitive is primitive', () => {
    forAll(primitive(), (x) => isPrimitive(x))
})
