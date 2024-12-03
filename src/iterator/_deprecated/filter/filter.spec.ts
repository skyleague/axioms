import { filter } from './index.js'

import { array, forAll, integer, unknown } from '../../../random/index.js'
import { all, equal } from '../../index.js'

import { it } from 'vitest'

it('filter true xs === xs', () => {
    forAll(array(unknown()), (xs) => equal([...filter(xs, () => true)], xs))
})

it('filter false xs === []', () => {
    forAll(array(unknown()), (xs) => equal([...filter(xs, () => false)], []))
})

it('filter even xs', () => {
    const even = (x: number) => x % 2 === 0
    forAll(array(integer()), (xs) => all(filter(xs, even), even))
})
