import { isSuccess } from './is-success.js'

import { forAll, unknown } from '../../random/index.js'

test('simple', () => {
    expect(isSuccess('foobar')).toBeTrue()
    expect(isSuccess(new Error())).toBeFalse()
})

test('unknown is success', () => {
    forAll(unknown(), (x) => isSuccess(x))
})
