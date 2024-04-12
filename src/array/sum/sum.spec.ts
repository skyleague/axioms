import { sum } from './index.js'

import { array, float, forAll, integer } from '../../random/index.js'

import { expect, it } from 'vitest'

it('tail simple', () => {
    expect(sum([1, 2, 3])).toMatchInlineSnapshot('6')
})

it('generator', () => {
    function* foobar() {
        yield 1
        yield 2
    }
    expect(sum(foobar())).toMatchInlineSnapshot('3')
})

it('sum xs === xs_0 + ... + xs_n', () => {
    forAll(array(integer()), (xs) => {
        let s = 0
        for (const x of xs) {
            s += x
        }
        expect(sum(xs)).toEqual(s)
    })
})

it('sum float xs === xs_0 + ... + xs_n', () => {
    forAll(array(float()), (xs) => {
        let s = 0
        for (const x of xs) {
            s += x
        }
        expect(sum(xs)).toEqual(s)
    })
})
