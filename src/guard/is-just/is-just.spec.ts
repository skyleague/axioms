import { isJust } from '.'

import { isNothing } from '..'
import { Nothing } from '../..'
import { forAll, unknown } from '../../random'

test('unknown is just', () => {
    forAll(unknown({ nothing: false }), (x) => isJust(x))
})

test('isJust == !isNothing', () => {
    forAll(unknown(), (x) => isJust(x) !== isNothing(x))
})

test('isJust(Nothing) === never', () => {
    const x = ([Nothing] as const).filter(isJust)
    const _y: never[] = x
})
