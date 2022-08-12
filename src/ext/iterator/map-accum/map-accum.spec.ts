import { mapAccumL } from '.'

import { collect } from '../../../array'
import { toGenerator } from '../../../type'

test('simple', () => {
    const ml = mapAccumL([9, 6, 3], (a, b) => [a, a * b], 5)

    expect(collect(toGenerator(ml))).toMatchInlineSnapshot(`
        Array [
          45,
          30,
          15,
        ]
    `)
})
