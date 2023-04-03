import { isRight } from './index.js'

import { forAll, unknown } from '../../random/index.js'

test('unknown is not right', () => {
    forAll(unknown(), (x) => !isRight(x))
})

test('right property is right', () => {
    expect(isRight({ right: 'foo' })).toBeTrue()
})
