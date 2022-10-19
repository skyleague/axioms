import { repeat } from './repeat'

import { collect } from '../../array/collect'
import { take } from '../../iterator'

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
