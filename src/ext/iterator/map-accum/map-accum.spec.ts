import { mapAccumL } from './index.js'

import { collect } from '../../../array/index.js'
import { toGenerator } from '../../../type/index.js'

test('simple', () => {
    const ml = mapAccumL([9, 6, 3], (a, b) => [a, a * b], 5)

    expect(collect(toGenerator(ml))).toMatchInlineSnapshot(`
        [
          45,
          30,
          15,
        ]
    `)
})
