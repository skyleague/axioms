import { sum } from '.'

import { forAll, array, integer, float } from '../../random'

test('tail simple', () => {
    expect(sum([1, 2, 3])).toMatchInlineSnapshot(`6`)
})

test('generator', () => {
    function* foobar() {
        yield 1
        yield 2
    }
    expect(sum(foobar())).toMatchInlineSnapshot(`3`)
})

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
