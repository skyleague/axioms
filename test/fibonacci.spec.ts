import { collect } from '../src/array/index.js'
import { take } from '../src/iterator/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    function* fibonacci() {
        let prev = 0
        let curr = 1
        while (true) {
            yield curr
            curr = curr + prev
            prev = curr - prev
        }
    }

    expect(collect(take(fibonacci(), 10))).toMatchInlineSnapshot(`
        [
          1,
          1,
          2,
          3,
          5,
          8,
          13,
          21,
          34,
          55,
        ]
    `)
})
