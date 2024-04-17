import { iterate } from './index.js'

import { collect } from '../../array/index.js'
import { allEqual, take } from '../../iterator/index.js'
import { float, forAll } from '../../random/index.js'
import { counter } from '../index.js'

import { expect, it } from 'vitest'

it('iterate x + 1 === counter x', () => {
    forAll(float(), (x) =>
        allEqual(
            take(
                iterate(x, (y) => y + 1),
                100,
            ),
            take(counter(x), 100),
        ),
    )
})

it('simple', () => {
    expect(
        collect(
            take(
                iterate('foo', (str) => `${str}bar`),
                4,
            ),
        ),
    ).toMatchInlineSnapshot(`
        [
          "foo",
          "foobar",
          "foobarbar",
          "foobarbarbar",
        ]
    `)
})
