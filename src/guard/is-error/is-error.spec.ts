import { isError } from './index.js'

import { forAll, unknown } from '../../random/index.js'

test('unknown is not error', () => {
    forAll(unknown(), (x) => !isError(x))
})

test('error is error', () => {
    expect(isError(new Error())).toBeTrue()
})
