import { expect, it } from 'vitest'

import { forAll, unknown } from '../../random/index.js'
import { isNothing } from '../index.js'
import { isJust } from './index.js'

const OtherNothing = Symbol.for('(Nothing)')

it('unknown is just', () => {
    forAll(unknown({ nothing: false }), (x) => isJust(x))
})

it('isJust == !isNothing', () => {
    forAll(unknown(), (x) => isJust(x) !== isNothing(x))
})

it('OtherNothing is Nothing', () => {
    expect(isJust(OtherNothing)).toBe(false)
})
