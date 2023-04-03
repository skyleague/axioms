import { isFailure } from './is-failure.js'

test('simple', () => {
    expect(isFailure('foobar')).toBeFalse()
    expect(isFailure(new Error())).toBeTrue()
})
