import { isUndefined } from '.'

import { forAll, unknown } from '../../random'

test('undefined', () => {
    expect(isUndefined(undefined)).toEqual(true)
})

test('null', () => {
    expect(isUndefined(null!)).toEqual(false)
})

test('void', () => {
    expect(isUndefined(void 0)).toEqual(true)
})

test('primitive is not undefined', () => {
    forAll(unknown({ undefined: false }), (x) => !isUndefined(x))
})
