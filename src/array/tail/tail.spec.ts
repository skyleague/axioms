import { tail } from '.'

import { collect } from '..'
import { allEqual } from '../../iterator'
import { forAll, array, unknown } from '../../random'
import { toTraversable } from '../../type'

test('tail simple', () => {
    expect(collect(tail([1, 2, 3]))).toMatchInlineSnapshot(`
        Array [
          2,
          3,
        ]
    `)
})

test('tail xs === xs[1:]', () => {
    forAll(array(unknown()), (xs) => allEqual(toTraversable(tail(xs)), xs.slice(1)))
})
