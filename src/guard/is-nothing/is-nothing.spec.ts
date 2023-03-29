import { isNothing } from './is-nothing.js'

import { forAll, unknown } from '../../random/index.js'
import { Nothing } from '../../type/index.js'

export const OtherNothing = Symbol.for('(Nothing)')

test('just values are not Nothing', () => {
    forAll(unknown({ nothing: false }), (x) => !isNothing(x))
})

test('nothing is Nothing', () => {
    expect(isNothing(Nothing)).toBeTrue()
})

test('OtherNothing is Nothing', () => {
    expect(isNothing(OtherNothing)).toBeTrue()
})
