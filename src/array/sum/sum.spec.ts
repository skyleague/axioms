import { sum } from '.'

import { forAll, array, integer, float } from '../../random'

test('sum xs === xs_0 + ... + xs_n', () => {
    forAll(array(integer()), (xs) => {
        let s = 0
        for (const x of xs) {
            s += x
        }
        expect(sum(xs)).toEqual(s)
    })
})

test('sum float xs === xs_0 + ... + xs_n', () => {
    forAll(array(float()), (xs) => {
        let s = 0
        for (const x of xs) {
            s += x
        }
        expect(sum(xs)).toEqual(s)
    })
})
