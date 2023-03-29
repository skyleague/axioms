import { all } from './index.js'

import { concat } from '../../iterator/index.js'
import { forAll, unknown, array, tuple, constant } from '../../random/index.js'

test('all true xs === true', () => {
    forAll(array(unknown()), (xs) => all(xs, () => true))
})

test('all false xs === false', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => !all(xs, () => false))
})

test('constant true === true', () => {
    forAll(array(constant(true), { minLength: 1 }), (xs) => all(xs, (x) => x))
})

test('random false + constant true === false', () => {
    forAll(
        tuple(array(constant(true), { minLength: 1 }), array(constant(false), { minLength: 1 }), array(constant(true))),
        ([xs, ys, zs]) => !all(concat(xs, ys, zs), (x) => x)
    )
})
