import { findLast } from './index.js'

import { counter } from '../../generator/index.js'
import { isNothing } from '../../guard/index.js'
import { take } from '../../iterator/index.js'
import { forAll, array, integer, natural } from '../../random/index.js'

import { expect, it } from 'vitest'

it('first in array without predicate', () => {
    forAll(array(integer()), (xs) => {
        const found = findLast(xs, () => true)
        if (xs.length === 0) {
            return isNothing(found)
        }
        const last = xs[xs.length - 1]
        return last === found
    })
})

it('finds randomly inserted', () => {
    forAll(array(natural()), (xs, { rng }) => {
        const randomIndex = Math.floor(rng.sample() * xs.length)
        xs.splice(randomIndex, 0, -1)
        return -1 === findLast(xs, (i) => i < 0) && xs.findIndex((i) => i === -1) === randomIndex
    })
})

it('finds first randomly inserted', () => {
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

it('simple', () => {
    expect(findLast(take(counter(), 123), (i) => i > 10)).toMatchInlineSnapshot(`122`)
})

it('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(findLast(foobar(), (str) => str.startsWith('b'))).toMatchInlineSnapshot(`"bar"`)
})

it('Nothing when nothing found', () => {
    expect(findLast(take(counter(100), 100), (i) => i < 10)).toMatchInlineSnapshot(`Symbol((Nothing))`)
})
