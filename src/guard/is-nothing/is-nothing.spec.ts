import { isNothing } from './is-nothing.js'

import { forAll, unknown } from '../../random/index.js'
import { Nothing } from '../../type/index.js'

import { expect, it } from 'vitest'

export const OtherNothing = Symbol.for('(Nothing)')

it('just values are not Nothing', () => {
    forAll(unknown({ nothing: false }), (x) => !isNothing(x))
})

it('nothing is Nothing', () => {
    expect(isNothing(Nothing)).toBe(true)
})

it('OtherNothing is Nothing', () => {
    expect(isNothing(OtherNothing)).toBe(true)
})
