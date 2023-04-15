import { collect } from './collect.js'

import { counter } from '../../generator/index.js'
import { take } from '../../iterator/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(collect(take(counter(), 4))).toMatchInlineSnapshot(`
        [
          0,
          1,
          2,
          3,
        ]
    `)
})

it('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(collect(foobar())).toMatchInlineSnapshot(`
        [
          "foo",
          "bar",
        ]
    `)
})
