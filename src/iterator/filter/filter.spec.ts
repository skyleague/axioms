import { filter } from './index.js'

import { all, equal } from '../../iterator/index.js'
import { forAll, array, unknown, integer } from '../../random/index.js'

test('filter true xs === xs', () => {
    forAll(array(unknown()), (xs) => equal([...filter(xs, () => true)], xs))
})

test('filter false xs === []', () => {
    forAll(array(unknown()), (xs) => equal([...filter(xs, () => false)], []))
})

test('filter even xs', () => {
    const even = (x: number) => x % 2 === 0
    forAll(array(integer()), (xs) => all(filter(xs, even), even))
})
