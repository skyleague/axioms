import { any } from './index.js'

import { concat } from '../../iterator/index.js'
import { array, constant, forAll, tuple, unknown } from '../../random/index.js'

import { it } from 'vitest'

it('any true xs === true', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => any(xs, () => true))
})

it('any true [] === false', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => !any(xs, () => true))
})

it('any false xs === false', () => {
    forAll(array(unknown()), (xs) => !any(xs, () => false))
})

it('constant true === true', () => {
    forAll(array(constant(true), { minLength: 1 }), (xs) => any(xs, (x) => x))
})

it('random false + constant true === true', () => {
    forAll(
        tuple(array(constant(true), { minLength: 1 }), array(constant(false), { minLength: 1 }), array(constant(true))),
        ([xs, ys, zs]) => any(concat(xs, ys, zs), (x) => x),
    )
})
