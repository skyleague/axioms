import { isPromise } from './is-promise.js'

test('simple', () => {
    expect(isPromise(Promise.resolve(1))).toBeTrue()
    expect(isPromise(1)).toBeFalse()
})
