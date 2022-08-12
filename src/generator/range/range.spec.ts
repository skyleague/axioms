import { range } from '.'

import { collect } from '../../array'
import { forAll, tuple, integer } from '../../random'

test('is [x,y[', () => {
    forAll(
        tuple(integer({ max: 100 }), integer({ min: 3, max: 100 })),
        ([x, y]) => {
            const to = x + y
            return collect(range(x, to)).includes(x) && !collect(range(x, to)).includes(to)
        },
        { counterExample: [0, 3] }
    )
})

test('floor y/2 + x is in [x,y[', () => {
    forAll(tuple(integer({ max: 100 }), integer({ min: 3, max: 100 })), ([x, y]) => {
        const to = x + y
        const half = Math.floor(y / 2) + x
        return collect(range(x, to)).includes(half)
    })
})
