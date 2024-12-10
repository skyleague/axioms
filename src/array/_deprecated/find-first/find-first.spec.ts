import { findFirst } from './index.js'

import { counter } from '../../../generator/_deprecated/counter/index.js'
import { isNothing } from '../../../guard/index.js'
import { take } from '../../../iterator/index.js'
import { array, forAll, natural, unknown } from '../../../random/index.js'

import { expect, it } from 'vitest'

it('first in array without predicate', () => {
    forAll(array(unknown()), (xs) => {
        const found = findFirst(xs, () => true)
        if (xs.length === 0) {
            return isNothing(found)
        }
        const [first] = xs
        return first === found
    })
})

it('finds randomly inserted', () => {
    forAll(array(natural()), (xs, { rng }) => {
        const randomIndex = Math.floor(rng.sample() * xs.length)
        xs.splice(randomIndex, 0, -1)
        return -1 === findFirst(xs, (i) => i < 0) && xs.findIndex((i) => i === -1) === randomIndex
    })
})

it('finds first randomly inserted', () => {
    forAll(array(natural()), (xs, { rng }) => {
        const randomIndex = Math.floor(rng.sample() * xs.length)
        const randomIndex2 = Math.floor(rng.sample() * (xs.length - randomIndex)) + randomIndex + 1
        xs.splice(randomIndex, 0, -1)
        xs.splice(randomIndex2, 0, -2)
        return (
            -1 === findFirst(xs, (i) => i < 0) &&
            xs.findIndex((i) => i === -1) === randomIndex &&
            xs.findIndex((i) => i === -2) === randomIndex2 &&
            randomIndex < randomIndex2
        )
    })
})

it('simple', () => {
    expect(findFirst(counter(), (i) => i > 10)).toMatchInlineSnapshot('11')
})

it('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(findFirst(foobar(), (str) => str.startsWith('b'))).toMatchInlineSnapshot(`"bar"`)
})

it('Nothing when nothing found', () => {
    expect(findFirst(take(counter(100), 100), (i) => i < 10)).toMatchInlineSnapshot('Symbol((Nothing))')
})
