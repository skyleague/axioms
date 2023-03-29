import { repeat } from './repeat.js'

import { collect } from '../../array/collect/index.js'
import { take } from '../../iterator/index.js'

test('constant', () => {
    expect(collect(take(repeat('foobar'), 4))).toMatchInlineSnapshot(`
        [
          "foobar",
          "foobar",
          "foobar",
          "foobar",
        ]
    `)
})

test('function', () => {
    expect(
        collect(
            take(
                repeat(() => 'foobar'),
                4
            )
        )
    ).toMatchInlineSnapshot(`
        [
          "foobar",
          "foobar",
          "foobar",
          "foobar",
        ]
    `)
})
