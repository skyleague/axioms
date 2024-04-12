import { repeat } from './repeat.js'

import { collect } from '../../array/collect/index.js'
import { take } from '../../iterator/index.js'

import { expect, it } from 'vitest'

it('constant', () => {
    expect(collect(take(repeat('foobar'), 4))).toMatchInlineSnapshot(`
        [
          "foobar",
          "foobar",
          "foobar",
          "foobar",
        ]
    `)
})

it('function', () => {
    expect(
        collect(
            take(
                repeat(() => 'foobar'),
                4,
            ),
        ),
    ).toMatchInlineSnapshot(`
        [
          "foobar",
          "foobar",
          "foobar",
          "foobar",
        ]
    `)
})
