import { isFailure } from './is-failure'

test('simple', () => {
    expect(isFailure('foobar')).toBeFalse()
    expect(isFailure(new Error())).toBeTrue()
})
