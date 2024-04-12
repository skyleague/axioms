import { all } from './index.js'

import { concat } from '../../iterator/index.js'
import { array, constant, forAll, tuple, unknown } from '../../random/index.js'

import { it } from 'vitest'

it('all true xs === true', () => {
    forAll(array(unknown()), (xs) => all(xs, () => true))
})

it('all false xs === false', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => !all(xs, () => false))
})

it('constant true === true', () => {
    forAll(array(constant(true), { minLength: 1 }), (xs) => all(xs, (x) => x))
})

it('random false + constant true === false', () => {
    forAll(
        tuple(array(constant(true), { minLength: 1 }), array(constant(false), { minLength: 1 }), array(constant(true))),
        ([xs, ys, zs]) => !all(concat(xs, ys, zs), (x) => x),
    )
})
