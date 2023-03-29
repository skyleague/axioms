import { isFunction } from './index.js'

import { forAll, unknown } from '../../random/index.js'

test('unknown is not a function', () => {
    forAll(unknown(), (x) => !isFunction(x))
})

test('lambda is function', () => {
    expect(isFunction(() => false)).toBeTrue()
})
