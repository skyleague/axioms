import { init } from './index.js'

import { array, forAll, unknown } from '../../random/index.js'

import { expect, it } from 'vitest'

it('simple', () => {
    expect(init([1, 2, 3])).toMatchInlineSnapshot(`
        [
          1,
          2,
        ]
    `)
})

it('generator', () => {
    function* foobar() {
        yield 'foo'
        yield 'bar'
    }
    expect(init(foobar())).toMatchInlineSnapshot(`
        [
          "foo",
        ]
    `)
})

it('init xs === xs[:-1]', () => {
    forAll(array(unknown()), (xs) => {
        expect(init(xs)).toEqual(xs.slice(0, xs.length - 1))
    })
})
