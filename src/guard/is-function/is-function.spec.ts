import { isFunction } from '.'

import { forAll, unknown } from '../../random'

test('unknown is not a function', () => {
    forAll(unknown(), (x) => !isFunction(x))
})

test('lambda is function', () => {
    expect(isFunction(() => false)).toBeTrue()
})
