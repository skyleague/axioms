import { isSuccess } from './is-success'

import { forAll, unknown } from '../../random'

test('simple', () => {
    expect(isSuccess('foobar')).toBeTrue()
    expect(isSuccess(new Error())).toBeFalse()
})

test('unknown is success', () => {
    forAll(unknown(), (x) => isSuccess(x))
})
