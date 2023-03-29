import { isLeft } from './index.js'

import { forAll, unknown } from '../../random/index.js'

test('unknown is not left', () => {
    forAll(unknown(), (x) => !isLeft(x))
})

test('left property is left', () => {
    expect(isLeft({ left: 'foo' })).toBeTrue()
})
