import { isJust } from '.'

import { isNothing } from '..'
import { forAll, unknown } from '../../random'

export const OtherNothing = Symbol.for('(Nothing)')

test('unknown is just', () => {
    forAll(unknown({ nothing: false }), (x) => isJust(x))
})

test('isJust == !isNothing', () => {
    forAll(unknown(), (x) => isJust(x) !== isNothing(x))
})

test('OtherNothing is Nothing', () => {
    expect(isJust(OtherNothing)).toBeFalse()
})
