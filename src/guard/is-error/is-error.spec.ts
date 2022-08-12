import { isError } from '.'

import { forAll, unknown } from '../../random'

test('unknown is not error', () => {
    forAll(unknown(), (x) => !isError(x))
})

test('error is error', () => {
    expect(isError(new Error())).toBeTrue()
})
