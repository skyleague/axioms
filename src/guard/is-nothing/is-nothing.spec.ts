import { isNothing } from './is-nothing'

import { forAll, unknown } from '../../random'
import { Nothing } from '../../type'

export const OtherNothing = Object.freeze(
    new (class {
        public ['(Nothing)'] = true
    })() as unknown as Nothing
)

test('just values are not Nothing', () => {
    forAll(unknown({ nothing: false }), (x) => !isNothing(x))
})

test('nothing is Nothing', () => {
    expect(isNothing(Nothing)).toBeTrue()
})

test('OtherNothing is Nothing', () => {
    expect(isNothing(OtherNothing)).toBeTrue()
})
