import { all } from '.'

import { concat } from '../../iterator'
import { forAll, unknown, array, tuple, constant } from '../../random'

test('all true xs === true', () => {
    forAll(array(unknown()), (xs) => all(xs, () => true) === true)
})

test('all false xs === false', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => all(xs, () => false) === false)
})

test('constant true === true', () => {
    forAll(array(constant(true), { minLength: 1 }), (xs) => all(xs, (x) => x) === true)
})

test('random false + constant true === false', () => {
    forAll(
        tuple(array(constant(true), { minLength: 1 }), array(constant(false), { minLength: 1 }), array(constant(true))),
        ([xs, ys, zs]) => all(concat(xs, ys, zs), (x) => x) === false
    )
})
