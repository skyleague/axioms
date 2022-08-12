import { findLast } from '.'

import { isNothing } from '../../guard'
import { forAll, array, integer, natural } from '../../random'

test('first in array without predicate', () => {
    forAll(array(integer()), (xs) => {
        const found = findLast(xs, () => true)
        if (xs.length === 0) {
            return isNothing(found)
        }
        const last = xs[xs.length - 1]
        return last === found
    })
})

test('finds randomly inserted', () => {
    forAll(array(natural()), (xs, { rng }) => {
        const randomIndex = Math.floor(rng.sample() * xs.length)
        xs.splice(randomIndex, 0, -1)
        return -1 === findLast(xs, (i) => i < 0) && xs.findIndex((i) => i === -1) === randomIndex
    })
})

test('finds first randomly inserted', () => {
    forAll(array(natural()), (xs, { rng }) => {
        const randomIndex = Math.floor(rng.sample() * xs.length)
        const randomIndex2 = Math.floor(rng.sample() * (xs.length - randomIndex)) + randomIndex + 1
        xs.splice(randomIndex, 0, -1)
        xs.splice(randomIndex2, 0, -2)
        return (
            -2 === findLast(xs, (i) => i < 0) &&
            xs.findIndex((i) => i === -2) === randomIndex2 &&
            xs.findIndex((i) => i === -2) === randomIndex2 &&
            randomIndex < randomIndex2
        )
    })
})
