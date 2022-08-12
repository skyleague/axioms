import { isDefined } from '.'

import { forAll, unknown } from '../..'

test('isDefined', () => {
    expect(isDefined([])).toBeTrue()
    expect(isDefined([1])).toBeTrue()
    expect(isDefined(null)).toBeFalse()
    expect(isDefined(undefined)).toBeFalse()
})

test('isDefined', () => {
    forAll(unknown(), (x) => isDefined(x) === (x !== undefined && x !== null))
})
